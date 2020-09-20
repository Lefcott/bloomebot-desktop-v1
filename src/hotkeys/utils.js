const { spawn } = window;

const childs = {};
export const turnOn = path => {
  if (childs[path]) return console.error(new Error(`Child with path ${path} is already running`).stack);

  const child = spawn('nodemon', ['--exec', 'babel-node', path], {
    stdio: ['pipe', 'pipe', 'pipe', 'ipc']
  });
  child.stdout.on('data', data => {
    console.log(`${data}`);
  });
  child.on('error', () => {
    console.log('Failed to start child.');
  });
  child.on('close', code => {
    console.log(`Child process exited with code ${code}`);
  });
  child.on('disconnect', () => {
    console.log(`Process ${path} disconnected`);
  });
  child.on('exit', () => {
    console.log(`Process ${path} exited`);
  });
  child.stdout.on('end', () => {
    console.log('Finished collecting data chunks.');
  });
  childs[path] = child;
};

export const turnOff = path => {
  if (!childs[path]) return console.error(new Error(`Child with path ${path} is not running`).stack);
  childs[path].kill();
  delete childs[path];
};
