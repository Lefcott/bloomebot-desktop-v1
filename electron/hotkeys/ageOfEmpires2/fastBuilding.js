import robotjs from 'robotjs';

let interval = null;

export const activateFastBuilding = () => {
  if (interval) return;
  interval = setInterval(() => {
    robotjs.mouseClick('left', false);
  }, 5);
};

export const deactivateFastBuilding = () => {
  if (!interval) return;
  clearInterval(interval);
  interval = null;
};
