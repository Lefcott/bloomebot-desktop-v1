import { ipcRenderer } from './ipcRenderer';

export const sendEvent = (name, ...args) => ipcRenderer.sendSync(name, ...args);
