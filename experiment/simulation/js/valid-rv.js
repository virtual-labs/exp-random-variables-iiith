var currFun1 = 0;
var functions1 = [[1, 0, 0, 0], [1, 2, 3, 4], [1, 2, 3, 4], [3.5, 2, 3, 4]];
var sigmaAlgebra1 = [[0, 0, 0, 0], [1, 1, 1, 1], [1, 0, 0, 0], [0, 1, 1, 1]];

document.addEventListener("DOMContentLoaded", function () {
    reset1();
});

function reset1() {
    const obs1 = document.getElementById("observations1");
    obs1.innerHTML = ""

    const result1 = document.getElementById("results1");
    result1.innerHTML = "Please select a function to check if it is a Random Variable or not.";

    const canvas1 = document.getElementById("canvas1");
    const ctx = canvas1.getContext("2d");
    ctx.clearRect(0, 0, canvas1.width, canvas1.height);

    currFun1 = 0;
    document.getElementById("img_f1").classList.remove("selected-img");
    document.getElementById("img_f2").classList.remove("selected-img");
    document.getElementById("img_f3").classList.remove("selected-img");
    document.getElementById("img_f4").classList.remove("selected-img");
}

function chooseFunction1(num) {
    reset1();
    currFun1 = num;
    const img = document.getElementById("img_f" + num);
    img.classList.add("selected-img");
}

function inverseSet(fun, val) {
    var res = fun.slice();
    for (let i = 0; i < fun.length; i++) {
        if (fun[i] <= val) {
            res[i] = 1;
        } else {
            res[i] = 0;
        }
    }
    return res;
}

function checkRV(sigmaAlgebra, fun) {
    var sortedFun = [...new Set(fun)].sort(function (a, b) { return a - b });
    for (let i = 0; i <= sortedFun.length; i++) {
        var val;
        if (i == 0) val = sortedFun[i] - 1;
        else if (i == sortedFun.length) val = sortedFun[i-1] + 1;
        else val = (sortedFun[i] + sortedFun[i - 1]) / 2;
        var inverse = inverseSet(fun, val);
        // check if inverse array is same as any of the sigmaAlgebra array
        var found = false;
        for (let j = 0; j < sigmaAlgebra.length; j++) {
            if (inverse.toString() == sigmaAlgebra[j].toString()) {
                found = true;
                break;
            }
        }
        if (!found) {
            return [false,val];
        }
    }
    return [true,0];
}

function check1() {
    if (currFun1 == 0) {
        alert("Please select a function.");
        reset1();
        return;
    }
    var res = checkRV(sigmaAlgebra1, functions1[currFun1 - 1]);
    const result1 = document.getElementById("results1");
    const obs1 = document.getElementById("observations1");
    if (res[0]) {
        result1.innerHTML = "The given function is a Random Variable.";
        obs1.innerHTML = "<b>Correct Answer!!!</b>"
        obs1.style.color = "green";
    } else {
        result1.innerHTML = "The inverse image of the function for " + (res[1])+" is not present in the sigma algebra. Hence, the given function is not a Random Variable.";
        obs1.innerHTML = "<b>Wrong Answer :(</b> ";
        obs1.style.color = "red";
    }
}

/////////////////////////////////////////////////////////////////////
// function createCanvas(id) {
//     const canvas = document.getElementById(id);
//     canvas.style.width = "100%"; // Set the width dynamically based on the container
//     canvas.style.height = "100%"; // Set the height dynamically based on the container
//     canvas.style.border = "1px solid #ccc";

//     // Use 'canvas' for your custom drawings or visualizations
//     const ctx = canvas.getContext("2d");
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
//     // draw numberline from -10 to 10 and mark these points on the line
//     ctx.beginPath();
//     ctx.moveTo(10, canvas.height / 2);
//     ctx.lineTo(canvas.width - 10, canvas.height / 2);
//     ctx.stroke();
//     ctx.font = "10px Arial";
//     // mark points -10 -5 0 5 10 with a vertical line
//     for (let i = 0; i < 6; i++) {
//         ctx.moveTo(10 + i * (canvas.width - 20) / 5, canvas.height / 2 - 3);
//         ctx.lineTo(10 + i * (canvas.width - 20) / 5, canvas.height / 2 + 3);
//         ctx.stroke();
//         ctx.fillStyle = "black";
//         ctx.fillText(-1 + i, 10 + i * (canvas.width - 20) / 5, canvas.height / 2 - 10);
//     }
//     return ctx;
// }
// function createCanvasInObservation1() {
//     const ctx = createCanvas("canvas1");
//     ctx.fillStyle = "black";
//     ctx.fillText("W1", 10 + 2 * 56, 90);
//     ctx.fillText("W2", 10 + 3 * 56, 90);
//     ctx.fillText("W3", 10 + 4 * 56, 90);
//     return ctx;
// }
// function shadeCanvas(ctx, start, end, region) {
//     ctx.beginPath();
//     if (region == 1) {
//         ctx.fillStyle = "rgba(0, 0, 200, 0.2)";
//     } else if (region == 2) {
//         ctx.fillStyle = "rgba(200, 0, 0, 0.2)";
//     } else if (region == 3) {
//         ctx.fillStyle = "rgba(0, 200, 0, 0.2)";
//     } else {
//         ctx.fillStyle = "rgba(0, 0, 200, 0.2)";
//     }

//     // Calculate the coordinates and dimensions based on the canvas size
//     const canvasWidth = ctx.canvas.width;
//     const canvasHeight = ctx.canvas.height;
//     const startX = 10 + start * (canvasWidth - 20) / 5;
//     const rectWidth = (end - start) * (canvasWidth - 20) / 5;

//     ctx.fillRect(startX, canvasHeight / 2 - 15, rectWidth, 30);
//     ctx.stroke();
// }
// function showResults1() {
//     const ctx = createCanvasInObservation1();
//     shadeCanvas(ctx, 0, 2, 1);
//     shadeCanvas(ctx, 2, 3, 2);
//     shadeCanvas(ctx, 3, 4, 3);
//     shadeCanvas(ctx, 4, 5, 4);
//     const result1 = document.getElementById("results1");
//     result1.innerHTML = "The inverse image of enteries in the 2nd interval , i.e. from 1 to 2 are not present in the sigma algebra. Hence, the given function is not a Random Variable.";
// }
// function changeSelect1(selection) {
//     const obs1 = document.getElementById("observations1");
//     reset1();
//     if (selection == 1) {
//         obs1.innerHTML = "<b>Wrong Answer :(</b> ";
//         obs1.style.color = "red";
//         document.getElementById("yes-btn-1").classList.add("selected-btn");
//     } else {
//         obs1.innerHTML = "<b>Correct Answer!!!</b>"
//         obs1.style.color = "green";
//         document.getElementById("no-btn-1").classList.add("selected-btn");
//     }
//     showResults1();
// }