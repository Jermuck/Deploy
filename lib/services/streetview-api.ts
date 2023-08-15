import axios from 'axios';
import { Services } from 'lib/types/services';
import axiosRetry from 'axios-retry';
import config from '../configs';

type StreetviewApi = Services['streetviewApi'];

export function newStreetviewApi(): StreetviewApi {
  const api = axios.create({ baseURL: 'https://maps.googleapis.com/maps/api/streetview' });

  const requestInterceptor = (cfg) => {
    cfg.headers.Accept = 'application/json';
    cfg.params.key = config.placesApiKey;
    return cfg;
  };
  const responseInterceptor = (response) => response.data;
  const errorInterceptor = (err) => {
    return Promise.reject(err);
  };

  api.interceptors.request.use(requestInterceptor);
  api.interceptors.response.use(responseInterceptor, errorInterceptor);

  axiosRetry(api, { retryDelay: axiosRetry.exponentialDelay, retries: 3 });

  const getStreetView: StreetviewApi['getStreetView'] = ({ location }) =>
    api.get('', { params: { location, size: '600x400', return_error_code: true }, responseType: 'arraybuffer' });

  return Object.freeze({
    getStreetView,
  });
}
