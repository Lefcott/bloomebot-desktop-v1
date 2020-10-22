import robotjs from 'robotjs';
import { compareStrings } from './utils';

const { SELECTED_COLOR, ANIMATRONICS, ANIMATRONIC_NAMES, PLACES, DEFAULT_COORDS } = require('./constants');

let active = false;
let interval;
let animatronic = ANIMATRONICS.freddy;

export const activateAnimatronBot = () => {
  if (active) return;
  active = true;
  interval = setInterval(() => {
    try {
      let foundSelected = false;
      const randXMove = Math.random() * 6;
      const randYMove = Math.random() * 6;
      for (let ii = 0; ii < animatronic.paths.length; ii += 1) {
        const path = animatronic.paths[ii];
        for (let i = 0; i < path.length - 1; i += 1) {
          const node = path[i];
          const nextNode = path[i + 1];
          const place = PLACES[node];
          const nextPlace = PLACES[nextNode];
          const moveX = place.checkAt ? place.checkAt.x : 0;
          const moveY = place.checkAt ? place.checkAt.y : 0;
          const nextMoveX = nextPlace.checkAt ? nextPlace.checkAt.x : 0;
          const nextMoveY = nextPlace.checkAt ? nextPlace.checkAt.y : 0;

          const color = robotjs.getPixelColor(place.x + moveX, place.y + moveY);
          if (!compareStrings(color, SELECTED_COLOR, 3)) continue;
          robotjs.moveMouse(nextPlace.x + nextMoveX + randXMove, nextPlace.y + nextMoveY + randYMove);
          robotjs.mouseClick('left', false);
          foundSelected = true;
          break;
        }
        if (foundSelected) break;
      }
      if (foundSelected) return;
      robotjs.moveMouse(DEFAULT_COORDS.x + randXMove, DEFAULT_COORDS.y + randYMove);
      robotjs.mouseClick('left', false);
    } catch (e) {
      console.error(e);
    }
  }, 10);
};

export const setAnimatronic = name => {
  const newAnimatronic = ANIMATRONICS[name];
  if (!newAnimatronic) return console.error(`Bad animatronic name, possible names are: ${ANIMATRONIC_NAMES}`);
  console.log('Set animatronics', name, newAnimatronic);
  animatronic = newAnimatronic;
};

export const deactivateAnimatronicBot = () => {
  if (!active) return;
  active = false;
  clearInterval(interval);
};
