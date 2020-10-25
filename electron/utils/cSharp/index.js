import isDev from 'electron-is-dev';

import { init, sendEvent } from './init';
import { EVENTS } from './constants';

// TODO remove
init();
// if (!isDev) init();

export const activateHelloWorld = () => sendEvent(EVENTS.HELLO_WORLD, true, {});
