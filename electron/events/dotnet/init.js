import fs from 'fs';
import isDev from 'electron-is-dev';
import { spawn } from 'child_process';
import { createConnection } from 'net';

import { PIPE_NAME, PIPE_PATH } from './constants';
import { EXE_PATH, KEEP_PATH } from './constants';
import wait from '../../utils/wait';

let resolveConnect;
let connectPromise;
/** @type {import('net').Socket}  */
let client;
let pingActivated = false;

const startConnectPromise = () => (connectPromise = new Promise(resolve => (resolveConnect = resolve)));

startConnectPromise();
/** @param {boolean} restartDotnet  */
const connect = async restartDotnet => {
  const removeListeners = () => {
    client.removeAllListeners('error');
  };
  const onError = error => {
    if (['ENOENT', 'EPIPE', 'ERR_STREAM_DESTROYED'].includes(error.code)) {
      console.log(`Reconnecting because of ${error.code}...`);

      pingActivated = false;
      client.destroy();
      removeListeners();
      return connect(false);
    }
    console.error(error);
  };
  const addListeners = () => {
    client.addListener('error', onError);
  };

  startConnectPromise();
  if (restartDotnet) fs.writeFileSync(KEEP_PATH, '');
  await wait(2000);

  console.log('Connecting...');
  client = createConnection(`${PIPE_PATH}${PIPE_NAME}`, () => {
    pingActivated = true;
    resolveConnect();
    connectPromise = null;
  });
  addListeners();
};

/** @param {string} name @param {boolean} activate @param {*} data  */
export const sendCSharpEvent = async (name, activate, data) => {
  await connectPromise;
  client.write(JSON.stringify({ name, activate, data }));
  return true;
};

export const init = async () => {
  if (isDev) {
    setInterval(() => {
      if (!pingActivated) return;
      sendCSharpEvent('ping', true, '');
    }, 1000);
    return connect(true);
  }
  const dotnet = spawn(EXE_PATH);

  dotnet.stdout.on('data', async data => {
    await connectPromise;
    console.log(`[.NET] ${data}`);
  });
};
