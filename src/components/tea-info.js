import TeaStore from '../data/tea-store';

const focused = TeaStore.focused;

const info = document.querySelector('.tea-info');
const temp = info.querySelector('.tea-info__temp');
const time = info.querySelector('.tea-info__time');

/**
 * Convert fahrenheit to celsius. Rounds the value
 *
 * @param {number} fahrenheit
 * @return {string}
 */
function convertToCelsius(fahrenheit) {
  const celsius = (fahrenheit - 32) * 5/9;
  return Math.round(celsius);
}

/**
 * Get the text used for updating time info
 *
 * @param {object} tea
 * @return {string}
 */
function getMinuteText(tea) {
  const { min, max } = tea.time;
  return `${min}-${max} Minutes`;
}

/**
 * Get the temp info used for updating time info
 *
 * @param {object} tea
 * @return {string}
 */
function getTempInfo(tea) {
  const { min, max } = tea.temperature;
  const minCelsius = convertToCelsius(min);
  const maxCelsius = convertToCelsius(max);
  return `${min}-${max} \u00b0F (${minCelsius}-${maxCelsius} \u00b0C)`;
}

/**
 * Update the info component with data from the tea object
 *
 * @param {object} tea
 */
function updateInfo(tea) {
  const currentTemp = temp.firstChild;
  const currentTime = time.firstChild;
  const tempNode = document.createTextNode(getTempInfo(tea));
  const timeNode = document.createTextNode(getMinuteText(tea));
  temp.replaceChild(tempNode, currentTemp);
  time.replaceChild(timeNode, currentTime);
}

updateInfo(focused);

/**
 * Update info when the focused tea changes
 */
TeaStore.addFocusListener(() => {
  updateInfo(TeaStore.focused);
});
