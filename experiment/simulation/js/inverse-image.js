
var W1 = document.getElementById("W1")
var W2 = document.getElementById("W2")
var W3 = document.getElementById("W3")
var W4 = document.getElementById("W4")
var C = document.getElementById("c")
var obsText = document.getElementById("observationText1");
const chx1 = document.getElementById('myChart1');

var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  });
}


function generateRandomValues(){
  W1.innerText =  (Math.random()*15 - 7.5).toFixed(2);
  W2.innerText =  (Math.random()*15 - 7.5).toFixed(2);
  W3.innerText =  (Math.random()*15 - 7.5).toFixed(2);
  W4.innerText =  (Math.random()*15 - 7.5).toFixed(2);
  C.innerText  =  (Math.random()*15 - 7.5).toFixed(2);
  obsText.innerText = "Values have been generated"
}

function verifyAns(val1, val2, val3, val4){
  var c = C.innerText
  var argContainer = [];
  argContainer.push(parseInt(val1))
  argContainer.push(parseInt(val2))
  argContainer.push(parseInt(val3))
  argContainer.push(parseInt(val4))
  var str = "{"
  var flag = 0
  for(var i = 0; i < 4; i++)
    if(argContainer[i] == 1){
      str += "W" + parseInt(i+1) + ", "
      flag = 1;
    }
  str = str.substring(0, str.length-2)
  str+="}"
  if(flag === 0)
      str = "{ }"
  if(c===""){
    obsText.innerText = "Option chosen was: "+ str+ ". Please generate the values before choosing the answer"
    displayChart1(0,0,0,0,0)
  }
  else{
    var w1 = parseInt(W1.innerText)
    var w2 = parseInt(W2.innerText)
    var w3 = parseInt(W3.innerText)
    var w4 = parseInt(W4.innerText)
    c =parseInt(c)
    var ansContainer = [0,0,0,0]
    if(w1 <= c)
      ansContainer[0] = 1 
    if(w2 <= c)
      ansContainer[1] = 1
    if(w3 <= c)
      ansContainer[2] = 1
    if(w4 <= c)
      ansContainer[3] = 1
    flag = 0;
    for(let i = 0; i < 4; i++)
      if(argContainer[i] != ansContainer[i])
        flag = 1;
    if(flag == 1)
      obsText.innerText = "Option chosen was: "+ str +". Incorrect answer. Please try again"
    else
    obsText.innerText = "Option chosen was: "+ str +". Correct answer. Please proceed ahead"

    displayChart1(2,4,5,6,7)
  }
}


function resetValues(){
  W1.innerText = ""
  W2.innerText = ""
  W3.innerText = ""
  W4.innerText = ""
  C.innerText = ""
  obsText.innerText = "Values have been Reset"
}

function displayChart1(val1, val2, val3, val4, val5){
  const data = {
    datasets: [{
      label: 'mapping of the sample space based on function f',
      data: [
        {
          x: val1,
          y: 'c'
        },
        {
          x: val2,
          y: 'w1'
        },
        {
          x: val3,
          y: 'w2'
        },
        {
          x: val5,
          y: 'w3'
        },
        {
          x: val5,
          y: 'w4'
        }
      ],
      backgroundColor: 'rgb(255, 99, 132)'
    },
    {
      label: 'The inverse image of c based on the function f',
      data: [
        {
          x: -8,
          y: -1 // Using -1 to ensure the shaded area is below the lowest y-axis category
        },
        {
          x: val1,
          y: -1 // Ensuring consistency with the starting point
        }
      ],
      showLine: true, // Connects the points with a line
      borderColor: 'rgba(0, 0, 0, 0)', // Makes the border line invisible
      backgroundColor: 'rgba(0, 255, 0, 0.25)', // Semi-transparent green for the shaded area
      fill: true, // Fills the area under the line
      tension: 0 // Disables bezier curves to keep the line straight
    }]
  };
  
  const config = {
    type: 'scatter',
    data: data,

    options: {
      scales: {
          x: {
              type: 'linear',
              position: 'bottom',
              min: -8,
              max: 8,
              title: {
                  display: true,
                  text: 'Values of the mapping'
              }
          },
          y: {
              type: 'category',
              labels: ['c', 'w2', 'w3', 'w4', 'w1'],
              title: {
                  display: true,
                  text: 'Categories'
              }
          }
      }, 
    }
  };
  new Chart(chx1, config);
}


