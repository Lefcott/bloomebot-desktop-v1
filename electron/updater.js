import { autoUpdater } from 'electron-updater';
import { updateAvailable, updateDownloaded } from './events/react/emitter';

/** @param {import('electron').BrowserWindow} mainWindow  */
export const startUpdater = mainWindow => {
  mainWindow.once('ready-to-show', () => {
    autoUpdater.checkForUpdatesAndNotify();

    autoUpdater.on('update-available', updateAvailable);
    autoUpdater.on('update-downloaded', updateDownloaded);
  });
};
