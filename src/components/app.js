import * as events from '../events';
import * as navigate from '../navigation';

/**
 * Links function as internal app navigation
 */
navigate.hijack();

/**
 * Set up screen transitions when the location hash changes
 */
events.hashchange(() => navigate.to(location.hash.replace('#', '') || 'home'));
