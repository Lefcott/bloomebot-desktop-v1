import { app, BrowserWindow, Menu } from 'electron';
import path from 'path';
import isDev from 'electron-is-dev';
import { defineEvents } from './events/react/emitter';
import './events';
import { startUpdater } from './updater';

let mainWindow;

function createWindow() {
  try {
    // Menu.setApplicationMenu(null);
    mainWindow = new BrowserWindow({
      icon: `${__dirname}\\favicon.ico`,
      width: 852,
      height: 480,
      center: true,
      hasShadow: true,
      webPreferences: { nodeIntegration: true, preload: `${__dirname}/preload.js`, devTools: isDev || true }
    });
    startUpdater(mainWindow);
  } catch (e) {
    console.error(e);
  }
  defineEvents(mainWindow.webContents);
  mainWindow.loadURL(
    isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, './react_build/index.html')}`
  );
  if (isDev) mainWindow.webContents.openDevTools();
  mainWindow.on('closed', () => (mainWindow = null));
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => mainWindow === null && createWindow());
