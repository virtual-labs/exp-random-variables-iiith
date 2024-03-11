
var W1 = document.getElementById("W1")
var W2 = document.getElementById("W2")
var W3 = document.getElementById("W3")
var W4 = document.getElementById("W4")
var C = document.getElementById("c")
var obsText = document.getElementById("observationText");

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
  W1.innerText =  Math.ceil(Math.random()*50 - 25);
  W2.innerText =  Math.ceil(Math.random()*50 - 25);
  W3.innerText =  Math.ceil(Math.random()*50 - 25);
  W4.innerText =  Math.ceil(Math.random()*50 - 25);
  C.innerText  =  Math.ceil(Math.random()*50 - 25);
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
  if(c==="")
    obsText.innerText = "Option chosen was: "+ str+ ". Please generate the values before choosing the answer"
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