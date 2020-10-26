import socketIo from 'socket.io-client';

import { env } from './events/emitter';

export const socket = socketIo(env.API_URL_BASE);
