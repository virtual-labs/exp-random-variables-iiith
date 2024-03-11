var W1 = document.getElementById("W1")
var W2 = document.getElementById("W2")
var W3 = document.getElementById("W3")
var W4 = document.getElementById("W4")
var C = document.getElementById("c")
var obsText = document.getElementById("observationText");
var X1 = document.getElementById("X1")
var X2 = document.getElementById("X2")
var X3 = document.getElementById("X3")
var X4 = document.getElementById("X4")
var D = document.getElementById("d")
var obsText1 = document.getElementById("observationText1");

var cnt1 = 0;
var cnt2 = 0;
var maxCnt1 = 1;
var maxCnt2 = 4;

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

function initialPosition(id1, id2) {
  id1.style.display = "block";
  id1.style.display = "flex";
  id2.style.display = "none";
}

function hide1(id1, id2) {
  if (cnt1 < maxCnt1) {
    cnt1 = cnt1 + 1;
    id1 = document.getElementById(id1);
    id2 = document.getElementById(id2);
    initialPosition(id2, id1);
    const obs1 = document.getElementById("observations1");
    obs1.innerHTML = "";
  }
}

function hide2(id1, id2) {
  cnt1 = cnt1 - 1;
  id1 = document.getElementById(id1);
  id2 = document.getElementById(id2);
  initialPosition(id1, id2);
  const obs1 = document.getElementById("observations1");
  obs1.innerHTML = "";
}

function hide3(id3, id4) {
  if (cnt2 < maxCnt2) {
    cnt2 = cnt2 + 1;
    id3 = document.getElementById(id3);
    id4 = document.getElementById(id4);
    initialPosition(id4, id3);
    const obs2 = document.getElementById("observations2");
    obs2.innerHTML = "";
  }
}

function hide4(id3, id4) {
  cnt2 = cnt2 - 1;
  id3 = document.getElementById(id3);
  id4 = document.getElementById(id4);
  initialPosition(id3, id4);
  const obs2 = document.getElementById("observations2");
  obs2.innerHTML = "";
}

function check1() {
  const m2 = document.getElementById("m2");
  const obs1 = document.getElementById("observations1");
  if (cnt1 == 0) {
    obs1.innerHTML = "Click on the sets"
    obs1.style.color = "black";
  }
  else {
    if (m2.style.display == "flex") {
      obs1.innerHTML = "<b>Correct Answer!!!</b>"
      obs1.style.color = "green";
    }
    else {
      obs1.innerHTML = "<b>Wrong Answer :(</b> ";
      obs1.style.color = "red";
    }
  }
}

function check2() {
  const m4 = document.getElementById("m4");
  const l4 = document.getElementById("l4");
  const i4 = document.getElementById("i4");
  const d4 = document.getElementById("d4");
  const obs1 = document.getElementById("observations2");
  if (cnt2 == 0){
    obs2.innerHTML = "Click on the sets"
    obs2.style.color = "black";
  }
  else{
    if (m2.style.display == "flex" && l4.style.display == "flex" && i4.style.display == "flex" && d4.style.display == "flex") {
      obs1.innerHTML = "<b>Correct Answer!!!</b>"
      obs1.style.color = "green";
    }
    else {
      obs1.innerHTML = "<b>Wrong Answer :(</b> ";
      obs1.style.color = "red";
    }
  }
}

function reset1() {
  cnt1 = 0;
  const obs1 = document.getElementById("observations1");
  obs1.innerHTML = "";
  const array1 = ["a1", "b1", "c1", "d1", "e1", "f1", "g1", "h1", "i1", "j1", "k1", "l1", "m1"];
  const array2 = ["a2", "b2", "c2", "d2", "e2", "f2", "g2", "h2", "i2", "j2", "k2", "l2", "m2"];
  if(array1.length != array2.length){
    alert("Error in reset1 function.");
    return;
  }
  for (var i = 0; i < array1.length; i++) {
    initialPosition(document.getElementById(array1[i]), document.getElementById(array2[i]));
  }
}

function reset2() {
  cnt2 = 0;
  const obs2 = document.getElementById("observations2");
  obs2.innerHTML = "";
  const array3 = ["a3", "b3", "c3", "d3", "e3", "f3", "g3", "h3", "i3", "j3", "k3", "l3", "m3"];
  const array4 = ["a4", "b4", "c4", "d4", "e4", "f4", "g4", "h4", "i4", "j4", "k4", "l4", "m4"];
  if(array3.length != array4.length){
    alert("Error in reset2 function.");
    return;
  }
  for (var i = 0; i < array3.length; i++){
    initialPosition(document.getElementById(array3[i]), document.getElementById(array4[i]));
  }
}

function page1() {
  const p1 = document.getElementById("page1");
  const p2 = document.getElementById("page2");
  reset1();
  p1.style.display = "block";
  p2.style.display = "none";
}

function page2() {
  const p1 = document.getElementById("page1");
  const p2 = document.getElementById("page2");
  reset2();
  p1.style.display = "none";
  p2.style.display = "block";
  
}

function generateRandomValues(){
  W1.innerText = (Math.random()*50 - 25).toFixed(2);
  W2.innerText = (Math.random()*50 - 25).toFixed(2);
  W3.innerText = (Math.random()*50 - 25).toFixed(2);
  W4.innerText = (Math.random()*50 - 25).toFixed(2);
  C.innerText  = (Math.random()*50 - 25).toFixed(2);
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

function generateRandomValues1(){
  X1.innerText = (Math.random()*50 - 25).toFixed(2);
  X2.innerText = (Math.random()*50 - 25).toFixed(2);
  X3.innerText = (Math.random()*50 - 25).toFixed(2);
  X4.innerText = (Math.random()*50 - 25).toFixed(2);
  obsText1.innerText = "Values have been generated"
}

function verifyAns1(val1, val2, val3, val4){
  var w1 = parseInt(X1.innerText)
  var w2 = parseInt(X2.innerText)
  var w3 = parseInt(X3.innerText)
  var w4 = parseInt(X4.innerText)
  var c = D.innerText
  console.log(c)
  c =parseInt(c)
  console.log(c)
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
  if(w1===""){
    obsText1.innerText = "Option chosen was: "+ str+ ". Please generate the values before choosing the answer"
  }
  else{
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
      obsText1.innerText = "Option chosen was: "+ str +". Incorrect answer. Please try again"
    else
      obsText1.innerText = "Option chosen was: "+ str +". Correct answer. Please proceed ahead"
      console.log('Here')
  }
}

function resetValues1(){
  X1.innerText = ""
  X2.innerText = ""
  X3.innerText = ""
  X4.innerText = ""
  D.innerText = ""
  obsText1.innerText = "Values have been Reset"
}

function invImg(id1, id2) {
  const p1 = document.getElementById(id1);
  const p2 = document.getElementById(id2);
  p1.style.display = "block";
  p2.style.display = "none";
}

function isNumberKey(evt) {
  var charCode = (evt.which) ? evt.which : evt.keyCode
  if (charCode > 31 && (charCode != 46 &&(charCode < 48 || charCode > 57)))
    return false;
  return true;
}