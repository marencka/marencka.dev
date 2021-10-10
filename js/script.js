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


function showStart() {
  var x = document.getElementById('startmenu');
  if (x.style.display === 'none') {
    x.style.display = 'block';
  } else {
    x.style.display = 'none';
  }
}
