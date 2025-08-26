// --------------------------------------
// 1. DOM References
// --------------------------------------
const problemDesc = document.getElementById('problem-description');
const cardsContainer = document.getElementById('function-cards-container');
const checkBtn = document.getElementById('check-btn');
const newProblemBtn = document.getElementById('new-problem-btn');
const observationsPanel = document.getElementById('observations-panel');
const plotContainer = document.getElementById('plot-container');
const canvas = document.getElementById('explanation-canvas');
const ctx = canvas.getContext('2d');

// --------------------------------------
// 2. Database & State
// --------------------------------------
const SAMPLE_SPACE = ['ω₁', 'ω₂', 'ω₃', 'ω₄'];
const SIGMA_ALGEBRAS = [
    { name: 'Trivial', sets: [[0,0,0,0], [1,1,1,1]] },
    { name: 'F₁', sets: [[0,0,0,0], [1,1,1,1], [1,0,0,0], [0,1,1,1]] },
    { name: 'F₂', sets: [[0,0,0,0], [1,1,1,1], [1,1,0,0], [0,0,1,1]] },
    { name: 'Power Set', sets: Array.from({length: 16}, (_, i) => [i&8&&1, i&4&&1, i&2&&1, i&1&&1])}
];
const FUNCTIONS = [
    { name: 'f₁', mapping: [1, 1, 1, 1] }, // Constant, always RV
    { name: 'f₂', mapping: [1, 2, 3, 4] },
    { name: 'f₃', mapping: [1, 2, 2, 1] },
    { name: 'f₄', mapping: [3, 1, 1, 3] },
    { name: 'f₅', mapping: [1, 1, 4, 4] },
    { name: 'f₆', mapping: [1, 2, 1, 2] },
];

let currentSigmaAlgebra;
let currentFunctions;
let correctAnswers;

// --------------------------------------
// 3. Logic Functions
// --------------------------------------
const inverseSet = (fun, val) => fun.map(v => v <= val ? 1 : 0);
const setToString = (set) => `{${SAMPLE_SPACE.filter((_, i) => set[i] === 1).join(',')}}`.replace('{}', '∅');

function checkRV(sigmaAlgebraSets, funMapping) {
    const sortedUniqueVals = [...new Set(funMapping)].sort((a, b) => a - b);
    const testPoints = [-Infinity, ...sortedUniqueVals, Infinity];
    
    for (const point of testPoints) {
        const invSet = inverseSet(funMapping, point);
        const isPresent = sigmaAlgebraSets.some(s => s.toString() === invSet.toString());
        if (!isPresent) {
            return { isValid: false, reason: `For c = ${point}, the inverse image is ${setToString(invSet)}, which is not in the sigma algebra.` };
        }
    }
    return { isValid: true };
}

// --------------------------------------
// 4. UI & Plotting Functions
// --------------------------------------
function createFunctionCard(func, id) {
    const card = document.createElement('div');
    card.className = 'function-card';
    card.dataset.id = id;
    card.innerHTML = `<h5>${func.name}</h5><p>${SAMPLE_SPACE.map((w, i) => `${w} → ${func.mapping[i]}`).join('<br>')}</p>`;
    card.addEventListener('click', () => card.classList.toggle('is-selected'));
    return card;
}

function plotInvalidReason(fun, sigmaAlgebra, c) {
    plotContainer.classList.remove('is-hidden');
    const fillHeight = 50;
    const extraNums = 1;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.moveTo(10, canvas.height / 2);
    ctx.lineTo(canvas.width - 10, canvas.height / 2);
    ctx.stroke();
    ctx.font = "12px sans-serif";

    const values = fun.mapping;
    const maxVal = Math.ceil(Math.max(...values, c));
    const minVal = Math.floor(Math.min(...values, c));
    const range = maxVal - minVal + 2 * extraNums;
    const step = (canvas.width - 20) / range;

    // Draw ticks
    for (let i = 0; i <= range; i++) {
        const xPos = 10 + i * step;
        ctx.moveTo(xPos, canvas.height / 2 - 4);
        ctx.lineTo(xPos, canvas.height / 2 + 4);
        ctx.stroke();
        ctx.fillStyle = "black";
        ctx.fillText(minVal - extraNums + i, xPos - 3, canvas.height / 2 - 12);
    }
    
    // Draw points for function values
    values.forEach((val, i) => {
        const xPos = 10 + (val - minVal + extraNums) * step;
        ctx.beginPath();
        ctx.arc(xPos, canvas.height / 2, 5, 0, 2 * Math.PI);
        ctx.fillStyle = "blue";
        ctx.fill();
        ctx.fillStyle = "black";
        ctx.fillText(SAMPLE_SPACE[i], xPos - 10, canvas.height / 2 + 25);
    });

    // Shade inverse image area and draw the 'c' line
    const cPos = 10 + (c - minVal + extraNums) * step;
    ctx.fillStyle = "rgba(255, 56, 96, 0.3)";
    ctx.fillRect(10, canvas.height/2 - fillHeight/2, cPos - 10, fillHeight);
    
    ctx.beginPath();
    ctx.moveTo(cPos, canvas.height / 2 - fillHeight/2);
    ctx.lineTo(cPos, canvas.height / 2 + fillHeight/2);
    ctx.strokeStyle = "red";
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.fillStyle = "red";
    ctx.fillText(`c=${c}`, cPos + 5, canvas.height / 2);
}

// --------------------------------------
// 5. Main Control Functions
// --------------------------------------
function setupProblem() {
    cardsContainer.innerHTML = '';
    observationsPanel.innerHTML = '<p>Select one or more functions and click "Check Answer".</p>';
    plotContainer.classList.add('is-hidden');

    currentSigmaAlgebra = SIGMA_ALGEBRAS[Math.floor(Math.random() * SIGMA_ALGEBRAS.length)];
    correctAnswers = FUNCTIONS.filter(f => checkRV(currentSigmaAlgebra.sets, f.mapping).isValid);
    const incorrectAnswers = FUNCTIONS.filter(f => !checkRV(currentSigmaAlgebra.sets, f.mapping).isValid);
    
    currentFunctions = [...correctAnswers, ...incorrectAnswers.slice(0, 4 - correctAnswers.length)];
    currentFunctions.sort(() => Math.random() - 0.5);

    currentFunctions.forEach((func, i) => cardsContainer.appendChild(createFunctionCard(func, i)));

    const sigmaString = currentSigmaAlgebra.sets.map(setToString).join(', ');
    problemDesc.innerHTML = `<p>Given \(\Omega\) = {${SAMPLE_SPACE.join(', ')}} and \(\mathcal{F}\) = <strong>{${sigmaString}}</strong></p>`;
}

function checkAnswer() {
    const selectedCards = Array.from(cardsContainer.querySelectorAll('.is-selected'));
    if (selectedCards.length === 0) {
        observationsPanel.innerHTML = '<p class="feedback-incorrect">Please select at least one function to check.</p>';
        plotContainer.classList.add('is-hidden');
        return;
    }

    const selectedFunctions = selectedCards.map(card => currentFunctions[card.dataset.id]);
    const correctIds = correctAnswers.map(f => f.name);
    const selectedIds = new Set(selectedFunctions.map(f => f.name));

    const allSelectionsAreValid = selectedFunctions.every(f => correctIds.includes(f.name));

    if (allSelectionsAreValid) {
        if (selectedIds.size === correctIds.length) {
            observationsPanel.innerHTML = '<p class="feedback-correct">Correct! You have found all the valid Random Variables for this Sigma Algebra.</p>';
            plotContainer.classList.add('is-hidden');
        } else {
            observationsPanel.innerHTML = `<p class="feedback-partial">You're on the right track! All your selections are valid Random Variables, but there are more to find. (${selectedIds.size} out of ${correctIds.length} found)</p>`;
            plotContainer.classList.add('is-hidden');
        }
    } else {
        const firstInvalid = selectedFunctions.find(f => !correctIds.includes(f.name));
        const checkResult = checkRV(currentSigmaAlgebra.sets, firstInvalid.mapping);
        observationsPanel.innerHTML = `<p class="feedback-incorrect">Incorrect. The function <strong>${firstInvalid.name}</strong> is not a valid Random Variable.</p><p class="feedback-reason">${checkResult.reason}</p>`;
        plotInvalidReason(firstInvalid, currentSigmaAlgebra.sets, parseFloat(checkResult.reason.split('=')[1]));
    }
}

// --------------------------------------
// 6. Event Listeners & Initialization
// --------------------------------------
newProblemBtn.addEventListener('click', setupProblem);
checkBtn.addEventListener('click', checkAnswer);
window.addEventListener('load', setupProblem);