let victoryClip = new Audio('./resources/FF7 AC Victory Fanfare Ringtone.mp3');

let durationInMinutes = 25;
let sessionCount = 0;
let end, x;

let startButton = document.getElementById("start-button");
let timeDisplay = document.getElementById("time-display");
let counter = document.getElementById("counter");
startButton.addEventListener("click", startTimer);

function timerLoop () {

  let now = new Date().getTime();
  let remaining = end - now;

  let minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((remaining % (1000 * 60)) / 1000);
  if (seconds < 10) seconds = `0${seconds}`;

  timeDisplay.innerHTML = minutes + ":" + seconds;

  if (remaining < 0) {
    clearInterval(x);
    timeDisplay.innerHTML = "VICTORY!";
    victoryClip.play();
    startButton.style.display = 'block';
    sessionCount++;
    counter.innerHTML = sessionCount.toString();
  }
}

function startTimer () {
  end = new Date().getTime() + (durationInMinutes * 60000);
  x = setInterval(timerLoop, 1000);

  startButton.style.display = 'none';
  startButton.innerHTML = 'One More!';
  timeDisplay.innerHTML = 'Be here now!';
  timeDisplay.style.display = 'block';
}

