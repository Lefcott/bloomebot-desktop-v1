import robotjs from 'robotjs';

import iohook from 'iohook';

iohook.on('mouseclick', event => {
  console.log(`#${robotjs.getPixelColor(event.x, event.y).toUpperCase()}`);
});

iohook.start();
