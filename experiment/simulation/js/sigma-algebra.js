// --------------------------------------
// 1. DOM References
// --------------------------------------
const problemDesc = document.getElementById('problem-description');
const availableSetsContainer = document.getElementById('available-sets');
const userCollectionContainer = document.getElementById('user-collection');
const checkBtn = document.getElementById('check-btn');
const newProblemBtn = document.getElementById('new-problem-btn');
const observationsPanel = document.getElementById('observations-panel');
// FIX: Added reference to the new hint button
const hintBtn = document.getElementById('hint-btn');

// --------------------------------------
// 2. Problem Database & State
// --------------------------------------
const SAMPLE_SPACE = ['a', 'b', 'c', 'd'];
const PROBLEMS = [
    {
        initial: ['{}', '{a,b,c,d}', '{a,b}'],
        answer: ['{c,d}']
    },
    {
        initial: ['{}', '{a,b,c,d}', '{a}', '{b}'],
        answer: ['{a,b}', '{c,d}', '{a,c,d}', '{b,c,d}']
    },
    {
        initial: ['{}', '{a,b,c,d}', '{a,c}'],
        answer: ['{b,d}']
    },
    {
        initial: ['{}', '{a,b,c,d}', '{a,b}', '{c}'],
        answer: ['{d}', '{c,d}', '{a,b,c}', '{a,b,d}']
    },
    {
        initial: ['{}', '{a,b,c,d}', '{a}', '{b}', '{c,d}'],
        answer: ['{a,b}', '{a,c,d}', '{b,c,d}']
    }
];

let currentProblem;

// --------------------------------------
// 3. Helper & Logic Functions
// --------------------------------------
const stringToSet = (str) => {
    const set = [0, 0, 0, 0];
    SAMPLE_SPACE.forEach((el, i) => {
        if (str.includes(el)) set[i] = 1;
    });
    return set;
};

const setToString = (set) => {
    const elements = SAMPLE_SPACE.filter((_, i) => set[i] === 1);
    return elements.length > 0 ? `{${elements.join(',')}}` : '{}';
};

const getPowerSet = () => {
    const base = SAMPLE_SPACE;
    // Generates all 16 subsets of the sample space
    const powerSetStrings = Array.from(
        { length: 1 << base.length },
        (_, i) => {
            const subset = base.filter((_, j) => (i >> j) & 1);
            return subset.length > 0 ? `{${subset.join(',')}}` : '{}';
        }
    );
    return powerSetStrings;
};


const complement = (set) => set.map(x => 1 - x);
const union = (set1, set2) => set1.map((val, i) => val || set2[i]);

function isSigmaAlgebra(collectionOfStrings) {
    const collectionOfSets = collectionOfStrings.map(stringToSet);
    const omega = stringToSet(`{${SAMPLE_SPACE.join(',')}}`);
    const empty = stringToSet('{}');

    if (!collectionOfStrings.includes(setToString(omega)) || !collectionOfStrings.includes(setToString(empty))) {
        return { valid: false, reason: `The collection must contain the empty set \(\emptyset\) and the sample space \(\Omega\).` };
    }

    for (const str of collectionOfStrings) {
        const set = stringToSet(str);
        const comp = complement(set);
        if (!collectionOfStrings.includes(setToString(comp))) {
            return { valid: false, reason: `The complement of <strong>${str}</strong>, which is <strong>${setToString(comp)}</strong>, is not included.` };
        }
    }
    
    for (const str1 of collectionOfStrings) {
        for (const str2 of collectionOfStrings) {
            const set1 = stringToSet(str1);
            const set2 = stringToSet(str2);
            const unionSet = union(set1, set2);
            if (!collectionOfStrings.includes(setToString(unionSet))) {
                return { valid: false, reason: `The union of <strong>${str1}</strong> and <strong>${str2}</strong>, which is <strong>${setToString(unionSet)}</strong>, is not included.` };
            }
        }
    }
    return { valid: true, reason: 'This collection satisfies all axioms!' };
}

// --------------------------------------
// 4. UI Functions
// --------------------------------------
function createTile(setText) {
    const tile = document.createElement('div');
    tile.className = 'tile';
    tile.textContent = setText;
    tile.dataset.set = setText;
    tile.addEventListener('click', handleTileClick);
    return tile;
}

function handleTileClick(event) {
    const tile = event.target;
    if (tile.parentElement.id === 'available-sets') {
        userCollectionContainer.appendChild(tile);
    } else {
        availableSetsContainer.appendChild(tile);
    }
    // Clear observations when user makes a change
    observationsPanel.innerHTML = '<p>Select the required sets and click "Check Answer".</p>';
}

function setupProblem() {
    availableSetsContainer.innerHTML = '';
    userCollectionContainer.innerHTML = '';
    observationsPanel.innerHTML = '<p>Select the required sets and click "Check Answer".</p>';
    
    currentProblem = PROBLEMS[Math.floor(Math.random() * PROBLEMS.length)];
    const allSets = getPowerSet();
    
    const nonProblemSets = allSets.filter(set => 
        !currentProblem.initial.includes(set) && !currentProblem.answer.includes(set)
    );
    
    const distractors = nonProblemSets.sort(() => 0.5 - Math.random()).slice(0, 5);
    
    const options = [...currentProblem.answer, ...distractors];
    options.sort(() => Math.random() - 0.5);

    options.forEach(setText => availableSetsContainer.appendChild(createTile(setText)));
    
    problemDesc.innerHTML = `
        <p>Given Ω = <strong>{${SAMPLE_SPACE.join(', ')}}</strong> and an initial collection C = <strong>{${currentProblem.initial.join(', ')}}</strong>.</p>
        <p>Select the minimum sets required to make C a Sigma Algebra.</p>
    `;
}

// --------------------------------------
// 5. Event Handlers & Initialization
// --------------------------------------
function checkAnswer() {
    const userAddedSets = Array.from(userCollectionContainer.children).map(tile => tile.dataset.set);
    const userFullCollection = [...currentProblem.initial, ...userAddedSets];
    const { valid, reason } = isSigmaAlgebra(userFullCollection);

    if (valid) {
        const userSet = new Set(userAddedSets.sort());
        const answerSet = new Set(currentProblem.answer.sort());
        
        if (userSet.size === answerSet.size && [...userSet].every(val => answerSet.has(val))) {
             observationsPanel.innerHTML = '<p class="feedback-correct">Correct! You have formed a valid Sigma Algebra with the minimum number of additional sets.</p>';
        } else {
            observationsPanel.innerHTML = `<p class="feedback-incorrect">This is a valid Sigma Algebra, but not the minimal one!</p><p>You added ${userSet.size} set(s), but only ${answerSet.size} were required to form the smallest possible sigma-algebra.</p>`;
        }
    } else {
        observationsPanel.innerHTML = `<p class="feedback-incorrect">Incorrect.</p><p>${reason}</p>`;
    }
}

function showHint() {
    if (currentProblem) {
        const hintText = `You need to add <strong>${currentProblem.answer.length}</strong> set(s) to the collection.`;
        observationsPanel.innerHTML = `<p class="feedback-hint">${hintText}</p>`;
    }
}

checkBtn.addEventListener('click', checkAnswer);
newProblemBtn.addEventListener('click', setupProblem);
hintBtn.addEventListener('click', showHint);
window.addEventListener('load', setupProblem);