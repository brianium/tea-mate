import { view } from 'minute-timer';

const digital = view.digital;

/**
 * @param {HTMLElement} element
 * @param {Timer} timer
 */
export function update(element, timer) {
  digtal.update(element, timer);
}

/**
 * @param {HTMLElement} element
 * @param {Timer} timer
 */
export function bind(element, timer) {
  digital.bind(element, timer);
}

/**
 * Create a time control
 *
 * @param {string} className
 * @return {HTMLElement}
 */
function control(className) {
  const ctrl = document.createElement('div');
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
 * Pass off to the digital view but augment with increment controls
 *
 * @param {HTMLElement} element
 * @param {Timer} timer
 */
export function create(element, timer) {
  digital.create(element, timer);
  controls(element, timer);
}
