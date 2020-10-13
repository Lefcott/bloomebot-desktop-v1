import { globalShortcut } from 'electron';
import robotjs from 'robotjs';

import { registerMany } from '../../utils/hotkeys';

export const turnOn = () => {
  const registered = registerMany('CommandOrControl+X', () => {
    robotjs.dragMouse(Math.random() * 500, Math.random() * 500);
  });

  if (!registered) {
    console.error('Failed to register');
    return false;
  }
  return true;
};

export const turnOff = () => {
  globalShortcut.unregisterAll();
  return true;
};
