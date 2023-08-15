import axios from 'axios';
import { Services } from 'lib/types/services';
import axiosRetry from 'axios-retry';
import config from '../configs';

type AttomApi = Services['attomApi'];

export function newAttomApi(): AttomApi {
  const api = axios.create({ baseURL: 'https://api.gateway.attomdata.com' });

  const requestInterceptor = (cfg) => {
    cfg.headers.Accept = 'application/json';
    cfg.headers.apikey = config.attomApiKey;
    return cfg;
  };
  const responseInterceptor = (response) => response.data;
  const errorInterceptor = (err) => {
    return Promise.reject(err);
  };

  api.interceptors.request.use(requestInterceptor);
  api.interceptors.response.use(responseInterceptor, errorInterceptor);

  axiosRetry(api, { retryDelay: axiosRetry.exponentialDelay, retries: 3 });

  const getPropertyExpandedProfile: AttomApi['getPropertyExpandedProfile'] = (params) =>
    api.get('/propertyapi/v1.0.0/property/expandedprofile', { params });

  return Object.freeze({
    getPropertyExpandedProfile,
  });
}
