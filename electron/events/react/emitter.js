/** @type {import('electron').WebContents}  */
let webContents;

export const defineEvents = _webContents => (webContents = _webContents);

export const playSound = path => webContents.send('playSound', path);
