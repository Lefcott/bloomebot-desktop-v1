import path from 'path';

export const PIPE_NAME = 'BloomebotHacksPipe';
export const PIPE_PATH = '\\\\.\\pipe\\';
export const EXE_PATH = path.join(__dirname, '../../dotnet/bin/Debug/netcoreapp3.1/publish/dotnet.exe');
export const KEEP_PATH = path.join(__dirname, '../../dotnet/keep.cs');