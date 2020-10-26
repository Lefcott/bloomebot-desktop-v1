import { sendEvent } from './sendEvent';

export const getOpenHacks = () => sendEvent('getHotkeysOn');
export const turnOn = hackCode => sendEvent('turnOn', hackCode);
export const turnOff = hackCode => sendEvent('turnOff', hackCode);
export const isDev = sendEvent('getIsDev');
export const env = JSON.parse(sendEvent('getEnv'));
export const rollbar = {
  info: (...args) => sendEvent('rollbar', 'info', ...args),
  warn: (...args) => sendEvent('rollbar', 'warn', ...args),
  error: (...args) => sendEvent('rollbar', 'error', ...args),
  critical: (...args) => sendEvent('rollbar', 'critical', ...args)
};
