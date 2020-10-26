import isDev from 'electron-is-dev';

import Rollbar from 'rollbar';

import { ROLLBAR_ACCESS_TOKEN } from '../env';

export default new Rollbar({
  accessToken: ROLLBAR_ACCESS_TOKEN,
  captureUncaught: true,
  captureUnhandledRejections: true,
  environment: isDev ? 'localhost' : 'production',
  verbose: true,
  itemsPerMinute: 500,
  maxItems: 500000
});
