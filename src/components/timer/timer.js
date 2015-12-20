import { timer } from 'minute-timer';
import * as digital from './view';

/**
 * Create the timer
 */
const state = {
  minutes: 3
};

const MINUTES_MAX = 9;
const SECONDS_MAX = 55;

/**
 * The timer. Maintains a single mutable reference
 */
let teaTimer = timer.create(state);

/**
 * Timer view
 */
const element = document.querySelector('.timer');
const control = document.querySelector('.button--control');
digital.create(element, teaTimer);

/**
 * Update the button text and flag the timer as started
 *
 * @param {Timer} timer
 */
function onStart(timer) {
  control.innerHTML = 'Stop Timer';
  control.dataset.started = '1';
}

/**
 * Update the button text and flag the timer as stopped
 *
 * @param {Timer} stopped
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
 * Update the timer instance to the new timer. Updating the state
 * to 0 for both seconds and minutes will disable the start button
 *
 * @param {Timer} timer
 */
function onUpdate(timer) {
  const { minutes, seconds } = timer.state;
  teaTimer = timer;
  if (minutes === 0 && seconds === 0) {
    control.setAttribute('disabled', 'disabled');
  } else {
    control.removeAttribute('disabled');
  }
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
 * Fires in response to clicking the minute increment control
 */
function incrementMinutes() {
  const { minutes, seconds } = teaTimer.state;
  const incremented = minutes + 1;
  timer.update(teaTimer, {
    minutes: incremented > MINUTES_MAX ? 0 : incremented,
    seconds
  });
}

/**
 * Fires in response to clicking the second increment control
 */
function incrementSeconds() {
  const { minutes, seconds } = teaTimer.state;
  const incremented = seconds + 5;
  timer.update(teaTimer, {
    minutes,
    seconds: incremented > SECONDS_MAX ? 0 : incremented
  });
}

/**
 * Fires in response to clicking the minute decrement control
 */
function decrementMinutes() {
  const { minutes, seconds } = teaTimer.state;
  const decremented = minutes - 1;
  timer.update(teaTimer, {
    minutes: decremented >= 0 ? decremented : MINUTES_MAX,
    seconds
  });
}

/**
 * Fires in response to the seconds decrement control
 */
function decrementSeconds() {
  const { minutes, seconds } = teaTimer.state;
  const decremented = seconds - 5;
  timer.update(teaTimer, {
    minutes,
    seconds: decremented >= 0 ? decremented : SECONDS_MAX
  });
}

/**
 * Listen for timer events
 *
 * @param {HTMLElement} control - the element that starts the timer
 */
export function start() {
  teaTimer.on('start', onStart);
  teaTimer.on('stop', onStop);
  teaTimer.on('tick', onUpdate);
  teaTimer.on('update', onUpdate)

  digital.observer.on('increment-minutes', incrementMinutes);
  digital.observer.on('increment-seconds', incrementSeconds);
  digital.observer.on('decrement-minutes', decrementMinutes);
  digital.observer.on('decrement-seconds', decrementSeconds);

  control.addEventListener('click', onControlClick);
}

/**
 * Reset the timer
 */
function reset() {
  teaTimer = timer.update(teaTimer, state);
  digital.observer.removeAllListeners();
  digital.update(element, teaTimer);
  digital.bind(element, teaTimer);
  start();
}
