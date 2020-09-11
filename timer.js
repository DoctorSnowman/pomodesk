let victoryClip = new Audio('./FF7 AC Victory Fanfare Ringtone.mp3');

let durationInMinutes = 1;
let end, x;

let startButton = document.getElementById("start-button");
let timeDisplay = document.getElementById("time-display");
startButton.addEventListener("click", startTimer);

function timerLoop () {

  let now = new Date().getTime();
  let remaining = end - now;

  let minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((remaining % (1000 * 60)) / 1000);

  timeDisplay.innerHTML = minutes + ":" + seconds;

  if (remaining < 0) {
    clearInterval(x);
    timeDisplay.innerHTML = "VICTORY!";
    victoryClip.play();
    startButton.style.display = 'block';
  }
}

function startTimer () {
  end = new Date().getTime() + (durationInMinutes * 60000);
  x = setInterval(timerLoop, 1000);

  startButton.style.display = 'none';
  startButton.innerHTML = 'One More!';
  timeDisplay.innerHTML = 'Ganbatte!';
  timeDisplay.style.display = 'block';
}

