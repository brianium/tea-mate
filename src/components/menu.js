import Slideout from 'slideout';

const slideout = new Slideout({
  panel: document.querySelector('.application'),
  menu: document.getElementById('menu'),
  padding: 256,
  tolerance: 70
});

const toggle = document.querySelector('.application__menu-toggle');

toggle.addEventListener('click', () => slideout.toggle());
