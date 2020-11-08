import isDev from 'electron-is-dev';
import { autoUpdater } from 'electron-updater';

import * as env from '../../env';
import rollbar from '../../utils/rollbar';

import { globalShortcut, ipcMain } from 'electron';

import * as Hotkeys from '../../hotkeys';

const hotkeysOn = {};

ipcMain.on('turnOn', (event, hackCode) => {
  if (hotkeysOn[hackCode]) {
    console.error(`Hotkey with hack code ${hackCode} is already ON`);
    return (event.returnValue = false);
  }
  const hotkey = Hotkeys[hackCode];
  if (!hotkey) {
    console.error(`Hotkey not found with hack code ${hackCode}`);
    return (event.returnValue = false);
  }
  hotkeysOn[hackCode] = true;
  console.log(`Open hack ${hackCode}`);
  event.returnValue = hotkey.up();
});

ipcMain.on('turnOff', (event, hackCode) => {
  if (!hotkeysOn[hackCode]) {
    console.error(`Hotkey with hack code ${hackCode} is not turned ON`);
    return (event.returnValue = false);
  }
  const hotkey = Hotkeys[hackCode];
  if (!hotkey) {
    console.error(`Hotkey not found with hack code ${hackCode}`);
    return (event.returnValue = false);
  }
  globalShortcut.unregisterAll();
  delete hotkeysOn[hackCode];
  console.log(`Close hack ${hackCode}`);
  event.returnValue = hotkey.down();
  event.returnValue = true;
});

ipcMain.on('getHotkeysOn', event => (event.returnValue = Object.keys(hotkeysOn)));
ipcMain.on('getIsDev', event => (event.returnValue = isDev));
ipcMain.on('getEnv', event => (event.returnValue = JSON.stringify(env)));
ipcMain.on('rollbar', (event, level, ...args) => (event.returnValue = true) && rollbar[level](...args));
ipcMain.on('closeAndInstallUpdate', event => {
  autoUpdater.quitAndInstall(false, true);
  event.returnValue = true;
});
