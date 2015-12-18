/**
 * Re apply overflow to an element. This is necessary because certain
 * events cause mobile safari to forget how to apply overflow settings
 *
 * @param {HTMLElement} element
 */
export function reflowY(element) {
  element.style.overflowY = 'hidden';
  setTimeout(() => element.style.overflowY = 'auto');
  return element;
}
