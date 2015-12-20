import TeaStore from '../data/tea-store';

const ACTIVE_CLASS = 'tea-nav__item--active';

const focused = TeaStore.focused;

TeaStore.addFocusListener(() => {
  const active = document.querySelector('.' + ACTIVE_CLASS);
  active.classList.remove(ACTIVE_CLASS);

  const id = TeaStore.focused.id;
  const item = document.querySelector(`.tea-nav__item[data-tea-id="${id}"]`);
  item.classList.add(ACTIVE_CLASS);
});

/**
 * Add a click listener for an item. When the listener is triggered,
 * the tea store will update the tea in focuse
 *
 * @param {HTMLElement} item
 */
function addListener(item) {
  item.addEventListener('click', () => {
    TeaStore.focus(item.getAttribute('data-tea-id'));
  });
}

/**
 * Register listeners with all tea nav items
 */
const items = document.querySelectorAll('.tea-nav__item');
for (let i = 0; i < items.length; i++) {
  const item = items[i];

  // initialize the active class
  const id = item.getAttribute('data-tea-id');
  if (id === focused.id) {
    item.classList.add(ACTIVE_CLASS);
  }

  addListener(item);
}
