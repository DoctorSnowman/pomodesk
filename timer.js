const Store = require('./store.js');

const store = new Store({
  configName: 'pomodesk',
  defaults: {
    durationInMinutes: 25,
    isTimeHidden: false,
  }
});

// resources
let victoryClip = new Audio('./resources/FF7 AC Victory Fanfare Ringtone.mp3');

// configuration options
const pausePeriod = 800;
const startMessageDuration = 2 * 1000; // 2s
const framesPerSecond = 24;

// init
let sessionCount = 0;
let pressedKeys = {};
let isTimeDisplayDirty = true;
let isPaused = false;
let isSessionRunning = false;
let elapsed, previousTime, asyncTimerRef, pauseDuration;
let durationInMs = getDurationInMs();

// element references
let startButton = document.getElementById("start-button");
let timeDisplay = document.getElementById("time-display");
let counter = document.getElementById("counter");
let body = document.getElementsByTagName("body")[0];

// eventing
startButton.addEventListener("click", startTimer);
window.onkeyup = function(e) { pressedKeys[e.key] = false; };
window.onkeydown = function(e) { pressedKeys[e.key] = true; };
window.onkeypress = reactToKeys;

function reactToKeys(event) {
  if (isSessionRunning) {
    switch (event.key) {
      case 'p':
        onPausePress();
        break;
      case 'd':
        cancelSession();
        break;
      default:
        break;
    }
  }
}

function onPausePress () {
  isPaused = !isPaused;

  if (isPaused) {
    timeDisplay.innerHTML = "~ Paused ~";
    pauseDuration = 0;
  } else {
    timeDisplay.innerHTML = "In Progress";
    previousTime = new Date().getTime();
    timeDisplay.style.opacity = '1'.toString();
  }
}

function displayTimer() {
  if (!store.get("isTimeHidden") || pressedKeys[" "]) {
    let remaining = durationInMs - elapsed;
    if (remaining < 0) remaining = 0;
    let minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((remaining % (1000 * 60)) / 1000);
    if (seconds < 10) seconds = `0${seconds}`;
    timeDisplay.innerHTML = minutes + ":" + seconds;
    isTimeDisplayDirty = true;
  } else if (store.get("isTimeHidden") && isTimeDisplayDirty) {
    timeDisplay.innerHTML = "In Progress";
    isTimeDisplayDirty = false;
  }
}

function timerLoop () {
  let currentTime = new Date().getTime();
  let delta = currentTime - previousTime;
  previousTime = currentTime;

  if (isPaused) {
    pauseDuration += delta;
    timeDisplay.style.opacity = lerp(pauseDuration);
  } else {
    elapsed += delta;
    if (elapsed > startMessageDuration) {
      displayTimer();
      if (elapsed >= durationInMs) {
        completeSession();
      }
    }
  }
}

function lerp (delta) {
  let theta = delta / pausePeriod;
  let opacity = Math.sin(theta);
  let smoothOpacity = smooth(opacity);
  return smoothOpacity.toString();
}

function smooth(t) {
  return t*t * (3 - 2*t)
}

function startTimer () {
  elapsed = 0;
  previousTime = new Date().getTime();
  asyncTimerRef = setInterval(timerLoop, 1000 / framesPerSecond);

  startButton.style.display = 'none';
  startButton.innerHTML = 'One More!';
  timeDisplay.innerHTML = 'Be here now!';
  timeDisplay.style.display = 'block';
  body.style.backgroundColor = "lightskyblue";
  isTimeDisplayDirty = true;
  isSessionRunning = true;
}

function cancelSession () {
  timeDisplay.style.display = 'none';
  timeDisplay.style.opacity = '1';
  isPaused = false;
  resetElements();
}

function completeSession() {
  timeDisplay.innerHTML = "VICTORY!";
  victoryClip.play();
  sessionCount++;
  counter.innerHTML = sessionCount.toString();
  resetElements();
}

function resetElements () {
  clearInterval(asyncTimerRef);
  startButton.style.display = 'block';
  body.style.backgroundColor = "white";
  isSessionRunning = false;
}

//todo: called on init, this should be updated whenever user sets duration preference
function getDurationInMs() {
  return store.get("durationInMinutes") * 60000;
}