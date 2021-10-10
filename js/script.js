setInterval(function clock() {

  const date = new Date();
  let hours = date.getHours();
  let minutes = date.getMinutes();

  let ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? '0' + minutes : minutes;
  let strTime = hours + ':' + minutes + ' ' + ampm;

  document.getElementById("clock").innerHTML = strTime;

}, 100);



dragElement(document.getElementById("intro"));
dragElement(document.getElementById('aboutme-content'));
dragElement(document.getElementById('contact-content'));
dragElement(document.getElementById('credits-content'));



function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "-header")) {
    /* if present, the header is where you move the DIV from:*/
    document.getElementById(elmnt.id + "-header").onmousedown = dragMouseDown;
  } else {
    /* otherwise, move the DIV from anywhere inside the DIV:*/
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    /* stop moving when mouse button is released:*/
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

function showIntro() {
  var x = document.getElementById('intro');
  if (x.style.display === 'none') {
    x.style.display = 'block';
  } else {
    x.style.display = 'none';
  }
}

function showAboutMe() {
  document.getElementById('aboutme-content').style.display = "block";
}

function showContact() {
  document.getElementById('contact-content').style.display = "block";
}

function showTerminal() {
  document.getElementById('terminal-content').style.display = 'block';
}

function showCredits() {
  document.getElementById('credits-content').style.display = 'block';
}

function closeOut() {
  var x = document.getElementById('closeOut');
  var y = document.getElementById('intro');
  y.style.display = 'none';
}

function closeOutAboutMe() {
  var x = document.getElementById('closeOutAboutMe');
  var y = document.getElementById('aboutme-content');
  y.style.display = 'none';
}

function closeOutContact() {
  var x = document.getElementById('closeOutContact');
  var y = document.getElementById('contact-content');
  y.style.display = 'none';
}


function closeOutCredits() {
  var x = document.getElementById('closeOutCredits');
  var y = document.getElementById('credits-content');
  y.style.display = 'none';
}

function closeOutTerminal() {
  document.getElementById('terminal-content').style.display = 'none';
}



document.addEventListener('mouseup', function (e) {
  var container = document.getElementById('startmenu');
  if (!container.contains(e.target)) {
    container.style.display = 'none';
  }
});

function showStart() {
  var x = document.getElementById('startmenu');
  if (x.style.display === 'none') {
    x.style.display = 'block';
  } else {
    x.style.display = 'none';
  }
}
