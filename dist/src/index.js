'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const core = require('@actions/core');
const setup_brisk_1 = require('./lib/setup-brisk');
(async () => {
  try {
    await (0, setup_brisk_1.default)();
  } catch (error) {
    core.setFailed(error.message);
  }
})();
