const Store = require('./store.js');

const store = new Store({
  configName: 'pomodesk',
  defaults: {
    durationInMinutes: 25,
    isTimeHidden: false,
    sessionCount: 0,
    volume: 1,
    victoryClipPath: './resources/FF7 AC Victory Fanfare Ringtone.mp3',
  }
});

// configuration options
const pausePeriod = 800;
const startMessageDuration = 2 * 1000; // 2s
const framesPerSecond = 24;

// init
let pressedKeys = {};
let isTimeDisplayDirty = true;
let isPaused = false;
let isSessionRunning = false;
let elapsed, previousTime, asyncTimerRef, pauseDuration, durationInMs;
let victoryClip;

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

init();

function init() {
  victoryClip = new Audio(store.get('victoryClipPath'));
  victoryClip.volume = store.get("volume");
  let sessionsAtLaunch = store.get("sessionCount");
  if (sessionsAtLaunch > 0) {
    counter.innerHTML = sessionsAtLaunch.toString();
  }
}

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
  durationInMs = store.get("durationInMinutes") * 60000;
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
  let newCount = incrementSessionCount();
  counter.innerHTML = newCount.toString();
  resetElements();
}

function resetElements () {
  clearInterval(asyncTimerRef);
  startButton.style.display = 'block';
  body.style.backgroundColor = "white";
  isSessionRunning = false;
}

function incrementSessionCount() {
  let count = store.get("sessionCount") + 1;
  store.set("sessionCount", count);
  return count;
}

function setVictoryClip(path) {
  victoryClip = new Audio(path);
  victoryClip.volume = store.get("volume");
  store.set('victoryClipPath', path);
}

function setVolume(volume) {
  store.set("volume",volume);
  victoryClip.volume = volume;
}