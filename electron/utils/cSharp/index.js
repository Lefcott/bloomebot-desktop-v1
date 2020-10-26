import { init, sendEvent } from './init';
import { EVENTS } from './constants';

init();

export const activateHelloWorld = () => sendEvent(EVENTS.HELLO_WORLD, true, {});
