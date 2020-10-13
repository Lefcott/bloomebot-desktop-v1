import { ipcMain } from 'electron';
import * as Hotkeys from './hotkeys';

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
  hotkey.turnOn();
  event.returnValue = true;
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
  hotkey.turnOff();
  delete hotkeysOn[hackCode];
  event.returnValue = true;
});

ipcMain.on('getHotkeysOn', event => {
  event.returnValue = Object.keys(hotkeysOn);
});
