/**
 * Store a reference to the application container
 */
const container = document.querySelector('.application__container');

/**
 * Monitor the container's scroll top position
 */
let scrollTop = container.scrollTop;
container.addEventListener('scroll', function () {
  scrollTop = container.scrollTop;
});

/**
 * Get the current state of the app containers top scroll position
 *
 * @return {number}
 */
export function top() {
  return scrollTop;
}
