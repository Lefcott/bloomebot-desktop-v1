import { globalShortcut } from 'electron';
import robotjs from 'robotjs';

import { registerMany } from '../../utils/hotkeys';

export const turnOn = () =>
  registerMany('CommandOrControl+X', () => {
    robotjs.dragMouse(Math.random() * 500, Math.random() * 500);
  });

export const turnOff = () => {
  globalShortcut.unregisterAll();
  return true;
};
