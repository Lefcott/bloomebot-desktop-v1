import { globalShortcut } from 'electron';
// import robotjs from 'robotjs';
// Register a 'CommandOrControl+X' shortcut listener.
const ret = globalShortcut.register('CommandOrControl+X', () => {
  console.log('CommandOrControl+X is pressed');
});

if (!ret) {
  console.log('registration failed');
}

// Check whether a shortcut is registered.
console.log(globalShortcut.isRegistered('CommandOrControl+X'));

// iohook.start();
// setInterval(() => {
//   robotjs.dragMouse(Math.random() * 500, Math.random() * 500);
// }, 2000);
