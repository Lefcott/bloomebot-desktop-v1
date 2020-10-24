const { ipcRenderer } = window;

delete window.ipcRenderer;

export const sendEvent = (name, ...args) => ipcRenderer.sendSync(name, ...args);

ipcRenderer.on('playSound', (event, path) => {
  new Audio(path).play();
  event.returnValue = true;
});
