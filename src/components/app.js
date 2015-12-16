import * as events from '../events';
import * as navigate from '../navigation';
import './timer';

navigate.init();

/**
 * Set up screen transitions when the location hash changes
 */
events.hashchange(() => navigate.to(location.hash.replace('#', '') || 'home'));
