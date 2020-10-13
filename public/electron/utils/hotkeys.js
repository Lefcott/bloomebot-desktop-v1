import { globalShortcut } from 'electron';

export const registerMany = (...registers) => {
  const registeredAccelerators = [];
  let success = true;

  for (let i = 0; i < registers.length; i += 2) {
    const accelerator = registers[i];
    const callback = registers[i + 1];
    const wasRegistered = globalShortcut.register(accelerator, callback);
    if (wasRegistered) registeredAccelerators.push(accelerator);
    else {
      success = false;
      break;
    }
  }
  if (!success) registeredAccelerators.forEach(accelerator => globalShortcut.unregister(accelerator));
  return success;
};
