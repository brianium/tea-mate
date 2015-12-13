const prefixes = ["webkit", "moz", "MS", "o", ""];

/**
 * Add prefixed event listeners
 *
 * @param {HTMLElement} element
 * @param {string} type
 * @param {function} listener
 */
export function prefixedEventListener(element, type, listener) {
  for (let prefix of prefixes) {
    const eventType = prefix || type.toLowerCase();
    element.addEventListener(prefix + eventType, listener);
  }
}

/**
 * Fire on an element when the animation ends
 *
 * @param {HTMLElement} element
 * @param {function} listener
 */
export function animationEnd(element, listener) {
  prefixedEventListener(element, 'AnimationEnd', listener);
}

/**
 * @param {HTMLElement} element
 * @param {function} listener
 */
export function animationEndOnce(element, listener) {
  const wrapped = (e) => {
    listener(e);
    e.target.removeEventListener(wrapped);
  }
  animationEnd(element, wrapped);
}

/**
 * Execute the listener when the hashchange event fires
 */
export function hashchange(listener) {
  window.addEventListener('hashchange', listener);
}
