import path from 'path';

export const PIPE_NAME = 'BloomebotHacksPipe';
export const PIPE_PATH = '\\\\.\\pipe\\';
export const EXE_PATH = path.join(__dirname, '../../dotnet/bin/Debug/netcoreapp3.1/dotnet.exe');
export const KEEP_PATH = path.join(__dirname, '../../dotnet/keep.cs');

export const EVENTS = {
  HELLO_WORLD: 'HelloWorld'
};
