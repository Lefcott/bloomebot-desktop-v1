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

const startConnectPromise = () => (connectPromise = new Promise(resolve => (resolveConnect = resolve)));

startConnectPromise();
const connect = async () => {
  startConnectPromise();
  fs.writeFileSync(KEEP_PATH, '');
  console.log('Wait 7 seconds');
  await wait(7000);
  console.log('Connecting with .NET...');
  connectPromise = null;
  client = createConnection(`${PIPE_PATH}${PIPE_NAME}`, () => {
    console.log('connected to .NET server!');
  });

  client.on('end', () => {
    console.log('disconnected from C#, reconnecting...');
    connect();
  });
  resolveConnect();
};

/** @param {string} name @param {boolean} activate @param {*} data  */
export const sendCSharpEvent = async (name, activate, data) => {
  await connectPromise;
  client.write(JSON.stringify({ name, activate, data }));
  return true;
};

export const init = async () => {
  if (isDev) return connect();
  const dotnet = spawn(EXE_PATH);

  dotnet.stdout.on('data', async data => {
    await connectPromise;
    data = `${data}`;
    console.log('.Net:', data);
  });
};
