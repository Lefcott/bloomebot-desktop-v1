import { request } from '../utils/request';
import { env } from '../utils/events/emitter';

export const login = (email, password) =>
  request.axios({
    options: {
      url: `${env.API_URL_BASE}/api/login`,
      method: 'post',
      data: { email, password }
    }
  });
