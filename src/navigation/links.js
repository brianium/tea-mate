const hashPattern = /#(.*)$/;

/**
 * Link to a specific screen
 *
 * @param {string} screen - the id to the screen
 */
function linkTo(screen) {
  const element = document.getElementById(screen);
  element.removeAttribute('id');
  location.hash = screen;
  element.setAttribute('id', screen);
}

/**
 * The listener that responds to a click action on the link
 */
function listener(e) {
  e.preventDefault();
  const match = hashPattern.exec(e.target.href);
  linkTo(match[1]);
}

/**
 * Make links not work like links because animations lol. This function
 * has links update the hash fragment without making the document jump. Links with a class
 * of external will be ignored
 */
export function hijack() {
  const anchors = document.querySelectorAll('a');
  for (let anchor of anchors) {
    if (! anchor.classList.contains('external')) {
      anchor.addEventListener('click', listener);
    }
  }
}
