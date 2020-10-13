import { globalShortcut } from 'electron';

export const turnOn = () => {
  const registered = globalShortcut.register('CommandOrControl+X', () => {
    console.log('CommandOrControl+X is pressed');
  });

  if (!registered) {
    console.error('Failed to register');
    return false;
  }
  return true;
};
export const turnOff = () => {
  globalShortcut.unregister('CommandOrControl+X');
  return true;
};
