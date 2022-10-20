import * as core from '@actions/core';
import { default as setup } from './lib/setup-brisk';

(async () => {
  try {
    await setup();
  } catch (error) {
    core.setFailed((error as Error).message);
  }
})();
