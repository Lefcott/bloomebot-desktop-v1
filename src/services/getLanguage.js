import { request } from '../utils/request';
import env from '../env.json';

export const getLanguage = () =>
  request.axios({
    options: {
      url: `${env.API_URL_BASE}/api/session/current_language`,
      method: 'get'
    }
  });
