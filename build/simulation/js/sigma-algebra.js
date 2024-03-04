var cnt1 = 0;
var cnt2 = 0;
var cnt3 = 0;

function initialPosition(id1, id2) {
  id1.style.display = "block";
  id1.style.display = "flex";
  id2.style.display = "none";
}

function hide1(id1, id2) {
  if (cnt1 < 1) {
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
  if (cnt2 < 8) {
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

function hide5(id5, id6) {
  if (cnt3 < 8) {
    cnt3 = cnt3 + 1;
    id5 = document.getElementById(id5);
    id6 = document.getElementById(id6);

    initialPosition(id6, id5);

    const obs3 = document.getElementById("observations3");
    obs3.innerHTML = "";
  }

}

function hide6(id5, id6) {
  cnt3 = cnt3 - 1;
  id5 = document.getElementById(id5);
  id6 = document.getElementById(id6);

  initialPosition(id5, id6);

  const obs3 = document.getElementById("observations3");
  obs3.innerHTML = "";
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




function reset1() {
  cnt1 = 0;

  const obs1 = document.getElementById("observations1");
  obs1.innerHTML = "";

  const array1 = ["a1", "b1", "c1", "d1", "e1", "f1", "g1", "h1", "i1", "j1", "k1", "l1", "m1", "n1", "o1", "p1"];
  const array2 = ["a2", "b2", "c2", "d2", "e2", "f2", "g2", "h2", "i2", "j2", "k2", "l2", "m2", "n2", "o2", "p2"];

  for (var i = 0; i < 16; i++) {
    initialPosition(document.getElementById(array1[i]), document.getElementById(array2[i]));
  }

}

function reset2() {
  cnt2 = 0;

  const obs2 = document.getElementById("observations2");
  obs2.innerHTML = "";

  const array3 = ["a3", "b3", "c3", "d3", "e3", "f3", "g3", "h3", "i3", "j3", "k3", "l3", "m3", "n3", "o3", "p3"];
  const array4 = ["a4", "b4", "c4", "d4", "e4", "f4", "g4", "h4", "i4", "j4", "k4", "l4", "m4", "n4", "o4", "p4"];

  for (var i = 0; i < 16; i++) {
    initialPosition(document.getElementById(array3[i]), document.getElementById(array4[i]));
  }

}

function reset3() {
  cnt3 = 0;

  const obs3 = document.getElementById("observations3");
  obs3.innerHTML = "";

  const array5 = ["a5", "b5", "c5", "d5", "e5", "f5", "g5", "h5", "i5", "j5", "k5", "l5", "m5", "n5", "o5", "p5"];
  const array6 = ["a6", "b6", "c6", "d6", "e6", "f6", "g6", "h6", "i6", "j6", "k6", "l6", "m6", "n6", "o6", "p6"];

  for (var i = 0; i < 16; i++) {
    initialPosition(document.getElementById(array5[i]), document.getElementById(array6[i]));
  }

}

function page1() {
  const p1 = document.getElementById("page1");
  const p2 = document.getElementById("page2");
  const p3 = document.getElementById("page3");


  reset1();
  p1.style.display = "block";
  p2.style.display = "none";
  p3.style.display = "none";

}

function page2() {
  const p1 = document.getElementById("page1");
  const p2 = document.getElementById("page2");
  const p3 = document.getElementById("page3");


  reset2();
  p1.style.display = "none";
  p2.style.display = "block";
  p3.style.display = "none";

}

function page3() {
  const p1 = document.getElementById("page1");
  const p2 = document.getElementById("page2");
  const p3 = document.getElementById("page3");


  reset3();
  p1.style.display = "none";
  p2.style.display = "none";
  p3.style.display = "block";

}




