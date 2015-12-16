import {timer, view} from 'minute-timer';

/**
 * Create the timer
 */
const state = {
  minutes: 3
};
let teaTimer = timer.create(state);

/**
 * Timer view
 */
const element = document.querySelector('.timer');
const control = document.querySelector('.button--control');
view.digital.create(element, teaTimer);

/**
 * Update the button text and flag the timer as started
 */
function onStart(timer) {
  control.innerHTML = 'Stop Timer';
  control.dataset.started = '1';
}

/**
 * Update the button text and flag the timer as stopped
 */
function onStop(stopped) {
  control.innerHTML = 'Start Timer';
  control.dataset.started = '0';
  const { minutes, seconds } = stopped.state;
  if (minutes === 0 && seconds === 0) {
    reset()
  }
}

/**
 * Update the timer instance to the new timer
 */
function onTick(timer) {
  teaTimer = timer;
}

/**
 * Toggle between starting and stopping the timer
 */
function onControlClick() {
  if (control.dataset.started === '1') {
    teaTimer = timer.stop(teaTimer);
  } else {
    teaTimer = timer.start(teaTimer);
  }
}

/**
 * Listen for timer events
 *
 * @param {HTMLElement} control - the element that starts the timer
 */
export function start() {
  teaTimer.on('start', onStart);
  teaTimer.on('stop', onStop);
  teaTimer.on('tick', onTick);
  control.addEventListener('click', onControlClick);
}

/**
 * Reset the timer
 */
function reset() {
  teaTimer = timer.create(state);
  view.digital.update(element, teaTimer);
  view.digital.bind(element, teaTimer);
  start();
}
