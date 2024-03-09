var cnt1 = 0;
var cnt2 = 0;
var maxCnt1 = 1;
var maxCnt2 = 4;

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

  const obs2 = document.getElementById("observations2");

  if (cnt2 == 0) {
    obs2.innerHTML = "Click on the sets"
    obs2.style.color = "black";
  }

  else {
    if (m2.style.display == "flex" && l4.style.display == "flex" && i4.style.display == "flex" && d4.style.display == "flex") {
      obs2.innerHTML = "<b>Correct Answer!!!</b>"
      obs2.style.color = "green";
    }
    else {
      obs2.innerHTML = "<b>Wrong Answer :(</b> ";
      obs2.style.color = "red";
    }
  }
}

function reset1() {
  cnt1 = 0;

  const obs1 = document.getElementById("observations1");
  obs1.innerHTML = "";

  const array1 = ["a1", "b1", "c1", "d1", "e1", "f1", "g1", "h1", "i1", "j1", "k1", "l1", "m1"];
  const array2 = ["a2", "b2", "c2", "d2", "e2", "f2", "g2", "h2", "i2", "j2", "k2", "l2", "m2"];

  if(array1.length != array2.length)
  {
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
  if(array3.length != array4.length)
  {
    alert("Error in reset2 function.");
    return;
  }
  for (var i = 0; i < array3.length; i++) {
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