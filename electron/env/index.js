import isDev from 'electron-is-dev';

const env = require(isDev ? './dev.json' : './prod.json');

export const DEBUG = (process.env.DEBUG = env.DEBUG);
export const ROLLBAR_ACCESS_TOKEN = (process.env.ROLLBAR_ACCESS_TOKEN = env.ROLLBAR_ACCESS_TOKEN);
export const API_URL_BASE = (process.env.API_URL_BASE = env.API_URL_BASE);
