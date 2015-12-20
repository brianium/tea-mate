import { EventEmitter } from 'events';

const teas = require('json!./tea.json');

export const TEA_FOCUSED = 'tea.changed';

class TeaStore extends EventEmitter {
  constructor() {
    super();
    this.data = new Map();
    teas.data.forEach(tea => this.data.set(tea.id, tea));

    const values = this.data.values();
    this.focused = values.next().value;
  }

  /**
   * Add a listener for when a new tea is focused
   *
   * @param {function} listener
   */
  addFocusListener(listener) {
    this.on(TEA_FOCUSED, listener);
  }

  /**
   * Get a tea by id
   *
   * @param {string} id
   * @return {object}
   */
  get(id) {
    return this.data.get(id);
  }

  /**
   * Puts a specific tea in focus
   *
   * @param {string} id
   */
  focus(id) {
    this.focused = this.data.get(id);
    this.emit(TEA_FOCUSED);
  }
}

const store = new TeaStore();

export default store;
