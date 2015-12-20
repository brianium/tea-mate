import { view } from 'minute-timer';
import { EventEmitter } from 'events';

/**
 * Observes view events. Mainly used to broadcast when an event has occurred
 * from the ui.
 */
export const observer = new EventEmitter();

/**
 * This view is an extension of the default digital view in the minute-timer package.
 *
 * It adds increment and decrement controls to the digital clock face
 */

const digital = view.digital;

/**
 * Get the opposite operation of the given one
 *
 * @param {string} type
 * @return {string}
 */
function other(type) {
  if (type === 'increment') {
    return 'decrement';
  }
  return 'increment';
}

/**
 * While the mouse is down emit an increment or decrement event
 *
 * @param {Timer} timer
 * @param {string} type - increment or decrement
 * @param {Event} e
 */
function onClick(timer, type, unit, e) {
  e.preventDefault();
  const control = e.target;
  const disabled = other(type);
  const event = `${type}-${unit}`;
  observer.emit(event);
  return false;
}

/**
 * Listen for all mouse events on increment and decrement controls
 *
 * @param {HTMLElement} component
 * @param {Timer} timer
 * @param {string} unit - minutes or seconds
 */
function listen(component, timer, unit) {
  const increment = component.querySelector('.minute-timer__control--increment');
  const decrement = component.querySelector('.minute-timer__control--decrement');
  increment.addEventListener('click', onClick.bind(null, timer, 'increment', unit));
  decrement.addEventListener('click', onClick.bind(null, timer, 'decrement', unit));
}

/**
 * Create a time control
 *
 * @param {string} className
 * @return {HTMLElement}
 */
function control(className) {
  const ctrl = document.createElement('button');
  ctrl.setAttribute('type', 'button');
  ctrl.className = `${className} minute-timer__control`;
  return ctrl;
}

/**
 * Add increment/decrement controls to the timer view
 *
 * @param {HTMLElement} element
 * @param {Timer} timer
 */
function controls(element, timer) {
  const minutes = element.querySelector('.minute-timer__minutes');
  const seconds = element.querySelector('.minute-timer__seconds');

  const increment = control('minute-timer__control--increment');
  const decrement = control('minute-timer__control--decrement');

  const minuteFrag = document.createDocumentFragment();
  minuteFrag.appendChild(increment);
  minuteFrag.appendChild(decrement);

  const secondFrag = minuteFrag.cloneNode(true);

  minutes.appendChild(minuteFrag);
  seconds.appendChild(secondFrag);
}

/**
 * @param {HTMLElement} element
 * @param {Timer} timer
 */
export function update(element, timer) {
  digital.update(element, timer);
}

/**
 * @param {HTMLElement} element
 * @param {Timer} timer
 */
export function bind(element, timer) {
  digital.bind(element, timer);
}

/**
 * Bind events to the increment and decrement controls
 *
 * @param {HTMLElement} element
 * @param {Timer} timer
 */
export function bindControls(element, timer) {
  const minutes = element.querySelector('.minute-timer__minutes');
  const seconds = element.querySelector('.minute-timer__seconds');
  listen(minutes, timer, 'minutes');
  listen(seconds, timer, 'seconds');
}

/**
 * Pass off to the digital view but augment with increment controls
 *
 * @param {HTMLElement} element
 * @param {Timer} timer
 */
export function create(element, timer) {
  digital.create(element, timer);
  controls(element, timer);
  bindControls(element, timer);
}
