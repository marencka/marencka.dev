

var clock = setInterval(function clock() {

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

function closeJob() {
  document.getElementById('job-content').style.display = 'none';
}

function closeUpdate() {
  document.getElementById('update-content').style.display = "none";
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

function closeOutCredits() {
  document.getElementById('credits-content').style.display = 'none';
}

function closeOutTerminal() {
  document.getElementById('terminal-content').style.display = 'none';
}

function closeOut() {
  document.getElementById('intro').style.display = 'none';
}

function closeOutAboutMe() {
  document.getElementById('aboutme-content').style.display = 'none';
}

function closeOutContact() {
  document.getElementById('contact-content').style.display = 'none';
}

function closeOutLogin() {
  document.querySelector('.login-content').style.display = 'none';
}

function openResume() {
  window.open('src/alexisdanzresume.pdf', '_blank');
  return false;
}

function openLoading() {
  document.getElementById('loading-content').style.display = 'block';
  document.getElementById('update-content').style.display = 'none';

  setTimeout(function () {
    document.getElementById('loading-content').style.display = 'none';
    document.getElementById('job-content').style.display = 'block';
  }, 7000);
}

function openPasswordDialog() {
  document.querySelector('.login-content').style.display = 'block';
}

function checkPassword() {
  var passwordTextarea = document.querySelector(".password");
  var loginContent = document.querySelector('.login-content');
  var applicationContent = document.querySelector(".application-content");

  if (passwordTextarea.value == null) {
    return;
  }

  if (passwordTextarea.value == "delay-200") {
    loginContent.style.display = "none";
    applicationContent.style.display = "block";
    gtag('event', 'button_click', {
      'event_category': 'User Interaction',
      'event_label': 'Tailwind App Viewed'
    });
  }
}

function closeOutApplication() {
  var applicationContent = document.querySelector(".application-content");

  if (applicationContent) {
    applicationContent.style.display = "none";
  }
}

function showStart() {
  var x = document.getElementById('startmenu');
  if (x.style.display === 'none') {
    x.style.display = 'block';
  } else {
    x.style.display = 'none';
  }
}

