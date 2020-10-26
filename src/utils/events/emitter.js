import { sendEvent } from './sendEvent';

export const getOpenHacks = () => sendEvent('getHotkeysOn');
export const turnOn = hackCode => sendEvent('turnOn', hackCode);
export const turnOff = hackCode => sendEvent('turnOff', hackCode);
export const isDev = sendEvent('getIsDev');
export const env = sendEvent('getEnv');
export const rollbar = sendEvent('getRollbar');
