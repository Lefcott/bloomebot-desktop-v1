import { request } from '../utils/request';
import { env } from '../utils/events/emitter';

export const register = (email, password, name, surname) =>
  request.axios({
    options: {
      url: `${env.API_URL_BASE}/api/register`,
      method: 'post',
      data: { email, password, name, surname }
    }
  });
