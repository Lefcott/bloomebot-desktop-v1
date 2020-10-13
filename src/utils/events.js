const { ipcRenderer } = window;

export const sendEvent = (name, ...args) => ipcRenderer.sendSync(name, ...args);
