/* Window helpers */
function openWindow(id) {
  document.getElementById(id).style.display = 'block';
}

function closeWindow(id) {
  document.getElementById(id).style.display = 'none';
}

function toggleWindow(id) {
  var el = document.getElementById(id);
  el.style.display = el.style.display === 'none' ? 'block' : 'none';
}

function openResume() {
  window.open('src/AMD2026.pdf', '_blank');
}

/* Taskbar clock */
function updateTime() {
  var now = new Date();
  var hours = now.getHours();
  var minutes = now.getMinutes();
  var ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12;
  minutes = minutes < 10 ? '0' + minutes : minutes;
  document.getElementById('clock').textContent = hours + ':' + minutes + ' ' + ampm;
}

/* Makes a window draggable by its title bar */
function dragElement(el) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  var handle = el.querySelector('.window-header') || el;
  handle.onmousedown = dragMouseDown;

  function dragMouseDown(e) {
    e.preventDefault();
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e.preventDefault();
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    el.style.top = (el.offsetTop - pos2) + 'px';
    el.style.left = (el.offsetLeft - pos1) + 'px';
  }

  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

/* BSOD easter egg: Konami code (up up down down left right left right B A) */
var KONAMI = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
var konamiProgress = 0;

document.addEventListener('keydown', function (e) {
  var bsod = document.getElementById('bsod');
  if (bsod.style.display !== 'none') {
    bsod.style.display = 'none';
    return;
  }

  var key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
  if (key === KONAMI[konamiProgress]) {
    konamiProgress++;
    if (konamiProgress === KONAMI.length) {
      konamiProgress = 0;
      bsod.style.display = 'flex';
    }
  } else {
    konamiProgress = key === KONAMI[0] ? 1 : 0;
  }
});

/* Init (script is loaded with defer, so the DOM is ready) */
updateTime();
setInterval(updateTime, 1000);

['intro', 'aboutme', 'contact', 'credits', 'terminal'].forEach(function (id) {
  dragElement(document.getElementById(id));
});

document.getElementById('bsod').addEventListener('click', function () {
  this.style.display = 'none';
});

/* Clicking outside the start menu closes it */
document.addEventListener('mouseup', function (e) {
  var menu = document.getElementById('startmenu');
  if (!menu.contains(e.target)) {
    menu.style.display = 'none';
  }
});
