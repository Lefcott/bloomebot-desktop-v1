import { app, BrowserWindow } from 'electron';
import path from 'path';
import isDev from 'electron-is-dev';
import './listener';

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    icon: `${__dirname}/favicon.ico`,
    width: 852,
    height: 480,
    center: true,
    hasShadow: true,
    webPreferences: { nodeIntegration: true, preload: `${__dirname}/preload.js` }
  });
  mainWindow.loadURL(
    isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../../build/index.html')}`
  );
  if (isDev) {
    // Open the DevTools.
    // BrowserWindow.addDevToolsExtension('<location to your react chrome extension>');
    mainWindow.webContents.openDevTools();
  }
  mainWindow.on('closed', () => (mainWindow = null));
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
