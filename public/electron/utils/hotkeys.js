import { globalShortcut } from 'electron';

const counters = {};
const pressTimeout = 350;

export const registerMany = (...registers) => {
  const registeredAccelerators = [];
  let success = true;

  for (let i = 0; i < registers.length; i += 2) {
    const accelerator = registers[i];
    const callback = registers[i + 1];
    const wrappedCallback = () => {
      counters[accelerator] = counters[accelerator] || 0;
      counters[accelerator] += 1;
      setTimeout(() => (counters[accelerator] -= 1), pressTimeout);
      callback();
    };
    const wasRegistered = globalShortcut.register(accelerator, wrappedCallback);
    if (wasRegistered) registeredAccelerators.push(accelerator);
    else {
      console.error(`Failed to register accelerator ${accelerator} with callback ${callback}`);
      success = false;
      break;
    }
  }
  if (!success) registeredAccelerators.forEach(accelerator => globalShortcut.unregister(accelerator));
  return success;
};

export const wasPressedNTimes = (x, accelerator) => counters[accelerator] >= x;
