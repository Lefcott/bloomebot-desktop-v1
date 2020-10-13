const { spawn } = require('child_process');
const { ipcRenderer } = require('electron');

window.spawn = spawn;
window.ipcRenderer = ipcRenderer;
