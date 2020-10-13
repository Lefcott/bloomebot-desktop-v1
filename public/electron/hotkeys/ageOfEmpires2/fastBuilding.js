import robotjs from 'robotjs';

import { wasPressedNTimes } from '../../utils/hotkeys';

export const makeFastBuilding = accelerator => () => {
  robotjs.dragMouse(Math.random() * 500, Math.random() * 500);
  if (wasPressedNTimes(3, accelerator)) console.log('3 TIMES!');
};
