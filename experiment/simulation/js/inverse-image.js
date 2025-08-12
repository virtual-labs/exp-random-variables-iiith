// --------------------------------------
// 1. DOM References
// --------------------------------------
const cInput = document.getElementById('c-input');
const generateBtn = document.getElementById('generate-btn');
const wValSpans = [
    document.getElementById('w1-val'), document.getElementById('w2-val'),
    document.getElementById('w3-val'), document.getElementById('w4-val')
];
const answerGrid = document.getElementById('answer-grid');
const observationsPanel = document.getElementById('observations-panel');
const chartCanvas = document.getElementById('inverse-chart');
const plotWrapper = document.querySelector('.plot-wrapper');
let chart;

// --------------------------------------
// 2. State Variables
// --------------------------------------
let functionValues = [null, null, null, null];
const OMEGA_CHARS = ['ω₁', 'ω₂', 'ω₃', 'ω₄'];
const OMEGA_LABELS = ['f(ω₁)', 'f(ω₂)', 'f(ω₃)', 'f(ω₄)'];
const COLOR_ABOVE = 'rgba(50, 115, 220, 0.9)';  // Blue
const COLOR_BELOW = 'rgba(35, 209, 96, 0.9)';   // Green
const COLOR_LINE = 'rgba(255, 56, 96, 1)';      // Red

// --------------------------------------
// 3. Main Logic
// --------------------------------------
function generateFunction() {
    // Generate new random values for the function
    functionValues = Array.from({ length: 4 }, () => parseFloat((Math.random() * 15 - 7.5).toFixed(2)));
    
    // Update the text display for each function value
    wValSpans.forEach((span, i) => {
        span.textContent = functionValues[i];
    });

    // Hide the plot until the user submits an answer
    plotWrapper.style.visibility = 'hidden';
    observationsPanel.innerHTML = '<p>Function values have been generated. Now select the correct inverse image set from the grid.</p>';
}

function verifyAnswer(userAnswerSet) {
    if (functionValues.includes(null)) {
        observationsPanel.innerHTML = '<p class="feedback-incorrect">Please generate the function values first!</p>';
        return;
    }

    const c = parseFloat(cInput.value);
    const correctIndices = [];
    
    // Determine the correct set of outcomes based on the definition f(ω) <= c
    functionValues.forEach((val, i) => {
        if (val <= c) {
            correctIndices.push(i);
        }
    });

    // Format the correct answer string (e.g., "{ω₁,ω₃}" or "∅")
    const correctAnswer = `{${correctIndices.map(i => OMEGA_CHARS[i]).join(',')}}`.replace('{}', '∅');

    // Compare user's answer with the correct answer and provide feedback
    if (userAnswerSet === correctAnswer) {
        observationsPanel.innerHTML = `<p class="feedback-correct">Correct! The inverse image for c=${c} is indeed ${userAnswerSet}.</p>`;
    } else {
        observationsPanel.innerHTML = `<p class="feedback-incorrect">Incorrect. You chose ${userAnswerSet}, but the correct answer is ${correctAnswer}.</p>`;
    }

    // Update and show the plot
    updatePlot();
    plotWrapper.style.visibility = 'visible';
}

// --------------------------------------
// 4. Plotting
// --------------------------------------
function updatePlot() {
    const c = parseFloat(cInput.value);
    if (isNaN(c) || functionValues.includes(null)) return;
    
    // This creates the "floating" bar effect.
    const barHeight = 0.4;
    const barData = functionValues.map(val => [val - barHeight / 2, val + barHeight / 2]);
    
    // Set bar colors based on whether they are <= c
    const barColors = functionValues.map(val => (val <= c ? COLOR_BELOW : COLOR_ABOVE));

    // Update the chart's data
    chart.data.datasets[0].data = barData;
    chart.data.datasets[0].backgroundColor = barColors;
    chart.data.datasets[1].data = [c, c, c, c]; // Update the threshold line

    // Dynamically adjust the y-axis to ensure all data is visible
    const allValues = [...functionValues, c];
    const yMax = Math.max(...allValues) + 2;
    const yMin = Math.min(...allValues) - 2;
    chart.options.scales.y.max = Math.max(8, yMax);
    chart.options.scales.y.min = Math.min(-8, yMin);

    chart.update();
}

// --------------------------------------
// 5. Initialization
// --------------------------------------
function initialize() {
    // --- Create all 16 possible subsets for the answer grid ---
    const allSubsets = Array.from({ length: 16 }, (_, i) => {
        const subset = [];
        if (i & 8) subset.push(OMEGA_CHARS[0]);
        if (i & 4) subset.push(OMEGA_CHARS[1]);
        if (i & 2) subset.push(OMEGA_CHARS[2]);
        if (i & 1) subset.push(OMEGA_CHARS[3]);
        return subset;
    });

    // --- Sort and create buttons for the answer grid ---
    allSubsets.sort((a, b) => a.length - b.length || a.join('').localeCompare(b.join('')));
    answerGrid.innerHTML = ''; // Clear previous buttons
    allSubsets.forEach(subset => {
        const button = document.createElement('button');
        button.className = 'button is-light ans-button';
        const setText = subset.length > 0 ? `{${subset.join(',')}}` : '∅';
        button.textContent = setText;
        button.onclick = () => verifyAnswer(setText);
        answerGrid.appendChild(button);
    });

    // --- Initialize the Chart ---
    chart = new Chart(chartCanvas, {
        type: 'bar', // Use a bar chart as the base
        data: {
            labels: OMEGA_LABELS,
            datasets: [
                {
                    label: 'f(ω) Values',
                    data: [], // Data will be [min, max] for floating bars
                    backgroundColor: [],
                    borderColor: 'rgba(0,0,0,0.1)',
                    borderWidth: 1,
                    barThickness: 40,
                    borderRadius: 20, // Creates the capsule effect
                    order: 1 // Ensure bars are drawn behind the line
                },
                {
                    type: 'line', // Overlay a line chart for the threshold
                    label: 'Threshold c',
                    data: [],
                    borderColor: COLOR_LINE,
                    borderWidth: 3,
                    pointRadius: 0,
                    fill: false,
                    order: 0 // Draw line on top of bars
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                title: { display: false },
                tooltip: { enabled: false } // Disable tooltips for a cleaner look
            },
            scales: {
                y: {
                    title: { display: true, text: 'Value', font: { size: 14, weight: 'bold' } },
                    grid: { color: '#eee' }
                },
                x: {
                    title: { display: true, text: 'Outcome Mapping', font: { size: 14, weight: 'bold' } },
                    grid: { display: false }
                }
            }
        }
    });

    // --- Hide plot initially and set up event listeners ---
    plotWrapper.style.visibility = 'hidden';
    cInput.addEventListener('input', () => {
        plotWrapper.style.visibility = 'hidden';
        observationsPanel.innerHTML = "<p>Value of 'c' changed. Please select an answer to see the result.</p>";
    });
    generateBtn.addEventListener('click', generateFunction);
}

window.addEventListener('load', initialize);