import { ipcRenderer } from '../ipcRenderer';

ipcRenderer.on('playSound', (event, path) => {
  new Audio(path).play();
  event.returnValue = true;
});
