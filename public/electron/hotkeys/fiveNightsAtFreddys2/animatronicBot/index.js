import robotjs from 'robotjs';

const { SELECTED_COLOR, ANIMATRONICS, PLACES, DEFAULT_COORDS } = require('./constants');

let active = false;
let interval;

export const activateAnimatronBot = () => {
  if (active) return;
  active = true;
  const animatronic = ANIMATRONICS.freddy;
  interval = setInterval(() => {
    let foundSelected = false;
    for (let i = 0; i < animatronic.path.length; i += 1) {
      const node = animatronic.path[i];
      const place = PLACES[node];
      const color = robotjs.getPixelColor(place.x, place.y);
      if (color !== SELECTED_COLOR) continue;
      const moveX = place.checkAt ? place.checkAt.x : 0;
      const moveY = place.checkAt ? place.checkAt.y : 0;
      robotjs.moveMouse(place.x + moveX, place.y + moveY);
      robotjs.mouseClick('left', false);
      foundSelected = true;
      break;
    }
    if (foundSelected) return;
    robotjs.moveMouse(DEFAULT_COORDS.x, DEFAULT_COORDS.y);
    robotjs.mouseClick('left', false);
  }, 10);
};

export const deactivateAnimatronBot = () => {
  if (!active) return;
  active = false;
  clearInterval(interval);
};
