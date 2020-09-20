import robotjs from 'robotjs';

import iohook from 'iohook';

iohook.on('mouseclick', ({ x, y }) => {
  console.log(`#${robotjs.getPixelColor(x, y).toUpperCase()}`);
});

iohook.start();
