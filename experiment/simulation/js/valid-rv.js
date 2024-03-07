document.addEventListener("DOMContentLoaded", function () {
    reset1();
    const ctx = createCanvasInObservation1();
});

function changeSelect1(selection) {
    const obs1 = document.getElementById("observations1");
    reset1();
    if (selection == 1) {
        obs1.innerHTML = "<b>Wrong Answer :(</b> ";
        obs1.style.color = "red";
        document.getElementById("yes-btn-1").style.backgroundColor = "grey";
    } else {
        obs1.innerHTML = "<b>Correct Answer!!!</b>"
        obs1.style.color = "green";
        document.getElementById("no-btn-1").style.backgroundColor = "grey";
    }
    showResults1();
}

function reset1() {
    const obs1 = document.getElementById("observations1");
    obs1.innerHTML = ""
    document.getElementById("yes-btn-1").style.backgroundColor = "lightseagreen";
    document.getElementById("no-btn-1").style.backgroundColor = "lightcoral";
}

function createCanvas(id){
    const canvas = document.getElementById(id);
    canvas.width = 300; // Set the width as needed
    canvas.height = 150; // Set the height as needed
    canvas.style.border = "1px solid #ccc";

    // Use 'canvas' for your custom drawings or visualizations
    const ctx = canvas.getContext("2d");
    // draw numberline from -10 to 10 and mark these points on the line
    ctx.beginPath();
    ctx.moveTo(10, 75);
    ctx.lineTo(290, 75);
    ctx.stroke();
    ctx.font = "10px Arial";
    // mark points -10 -5 0 5 10 with a vertical line
    for (let i = 0; i < 6; i++) {
        ctx.moveTo(10 + i * 56, 72);
        ctx.lineTo(10 + i * 56, 78);
        ctx.stroke();
        ctx.fillText(-1 + i, 10 + i * 56, 60);
    }
    return ctx;
}

function createCanvasInObservation1() {
    const ctx = createCanvas("canvas1");
    ctx.fillText("W1",10+2*56, 90);
    ctx.fillText("W2",10+3*56, 90);
    ctx.fillText("W3",10+4*56, 90);
    return ctx;
}

function shadeCanvas(ctx, start, end, region){
    ctx.beginPath();
    if (region == 1) {
        ctx.fillStyle = "rgba(0, 0, 200, 0.2)";
    }
    else if (region == 2){
        ctx.fillStyle = "rgba(200, 0, 0, 0.2)";
    }
    else if (region == 3){
        ctx.fillStyle = "rgba(0, 200, 0, 0.2)";
    }
    else {
        ctx.fillStyle = "rgba(0, 0, 200, 0.2)";
    }
    ctx.fillRect(10+start*56, 60, (end-start)*56, 30);
    ctx.stroke();
}

function showResults1(){
    const ctx = createCanvasInObservation1();
    shadeCanvas(ctx, 0, 2,1);
    shadeCanvas(ctx, 2, 3,2);
    shadeCanvas(ctx, 3, 4,3);
    shadeCanvas(ctx, 4, 5,4);
    const result1 = document.getElementById("results1");
    result1.innerHTML = "The inverse image of enteries in the 2nd interval , i.e. from 1 to 2 are not present in the sigma algebra. Hence, the given function is not a Random Variable.";
}