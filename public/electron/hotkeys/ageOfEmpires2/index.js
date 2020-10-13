import { globalShortcut } from 'electron';

import { registerMany } from '../../utils/hotkeys';
import { makeFastBuilding } from './fastBuilding';

export const turnOn = () => registerMany('Q', makeFastBuilding('Q'));

export const turnOff = () => {
  globalShortcut.unregisterAll();
  return true;
};
