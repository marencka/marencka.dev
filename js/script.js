
setInterval(function clock() {

    const date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();

    let ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    let strTime = hours + ':' + minutes + ' ' + ampm;

    document.getElementById("time").innerHTML = strTime;

}, 100); 

function showDiv() {
    document.getElementById('welcomeDiv').style.display = "block";
 }


