import { turnOn, turnOff } from 'hotkeys/utils';

export const clicksOn = () => turnOn('src/hotkeys/clicks/process');
export const clicksOff = () => turnOff('src/hotkeys/clicks/process');
