import * as monitor from './monitor';
import * as events from '../events';

/**
 * Get the offset height to use for the application container.
 * This will be the header portion of the application chrome
 *
 * @return {number}
 */
function offsetHeight() {
  const header = document.querySelector('.application__header');
  return header.offsetHeight;
}

/**
 * Put the application in a transitioning state
 *
 * @return {HTMLElement}
 */
function transitionContainer() {
  const container = document.querySelector('.application__container');
  container.classList.add('application__container--transitioning');
  return container;
}

/**
 * Swap the active class between the two elements
 *
 * @param {HTMLElement} active
 * @param {HTMLElement} inactive
 */
function swapActive(active, inactive) {
  active.classList.remove('screen--active');
  inactive.classList.add('screen--active');
}

/**
 * Transition to the given screen
 *
 * @param {HTMLElement} screen
 * @param {number} offset - the top and bottom offset the screen needs to snap to during transition
 * @return {HTMLElement}
 */
function transitionTo(screen, offset) {
  screen.classList.add('screen--transitioning-to');
  screen.style.top = offset + 'px';
  screen.style.bottom = offset + 'px';
  return screen;
}

/**
 * Returns a listener that runs after a screen is transitioned to. Will
 * pull the container element out of a transitioning state and re-enable
 * overflow scrolling.
 *
 * @param {HTMLElement} container
 * @return {function}
 */
function onTransitionTo(container) {
  return function completeTransitionTo(e) {
    const to = e.target;
    to.style.overflowY = 'hidden';
    setTimeout(() => to.style.overflowY = 'auto');
    to.classList.remove('screen--transitioning-to');
    container.classList.remove('application__container--transitioning');
    to.style.top = to.style.bottom = 'auto';
  }
}

/**
 * Transition away from a screen
 *
 * @param {HTMLElement} screen
 * @param {number} offset
 * @return {HTMLElement}
 */
function transitionFrom(screen, offset) {
  screen.classList.add('screen--transitioning-from');
  screen.style.top = offset - monitor.top() + 'px';
  return screen;
}

/**
 * A listener that runs after a screen is transitioned away from
 *
 * @param {Event} e
 */
function onTransitionFrom(e) {
  const from = e.target;
  from.classList.remove('screen--transitioning-from');
  from.style.top = from.style.bottom = 'auto';
}

/**
 * Transition from one screen to another
 *
 * @param {HTMLElement} from
 * @param {HTMLElement} to
 */
function transition(from, to) {
  const container = transitionContainer();
  const height = offsetHeight();
  swapActive(from, to);
  events.animationEndOnce(transitionTo(to, height), onTransitionTo(container));
  events.animationEndOnce(transitionFrom(from, height), onTransitionFrom);
}

/**
 * Navigate to a specific screen, defaulting to the home screen
 *
 * @param {string} screen
 */
export function to(screen = 'home') {
  const target = document.getElementById(screen);
  const previous = document.querySelector('.screen--active');
  transition(previous, target);
}

export { hijack } from './links';
