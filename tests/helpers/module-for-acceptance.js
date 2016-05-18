import { module } from 'qunit';
import startApp from '../helpers/start-app';
import destroyImageApp from '../helpers/destroyImage-app';

export default function(name, options = {}) {
  module(name, {
    beforeEach() {
      this.application = startApp();

      if (options.beforeEach) {
        options.beforeEach.apply(this, arguments);
      }
    },

    afterEach() {
      if (options.afterEach) {
        options.afterEach.apply(this, arguments);
      }

      destroyImageApp(this.application);
    }
  });
}
