import * as events from '../events';
import * as navigate from '../navigation';
import { reflowY } from '../screen';
import './timer';
import './tea-nav';
import './menu';

navigate.init();

/**
 * Set up screen transitions when the location hash changes
 */
events.hashchange(() => navigate.to(location.hash.replace('#', '') || 'home'));

/**
 * Reflow the active app screen when media changes
 */
const portrait = window.matchMedia("(orientation: portrait)");
portrait.addListener(() => reflowY(document.querySelector('.screen--active')));
