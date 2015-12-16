import Slideout from 'slideout';

const slideout = new Slideout({
  panel: document.querySelector('.application'),
  menu: document.getElementById('menu'),
  padding: 256,
  tolerance: 70
});

const toggle = document.querySelector('.application__menu-toggle');

toggle.addEventListener('click', () => slideout.toggle());

// close the slideout menu when clicking a link
const menuItems = document.querySelectorAll('.menu__item');
for (let item of menuItems) {
  item.addEventListener('click', () => slideout.close());
}
