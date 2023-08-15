import axios from 'axios';
import { Services } from 'lib/types/services';
import axiosRetry from 'axios-retry';
import config from '../configs';

type PlacesApi = Services['placesApi'];

export function newPlacesApi(): PlacesApi {
  const api = axios.create({ baseURL: 'https://maps.googleapis.com/maps/api/place' });

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

  const getAutocomplete: PlacesApi['getAutocomplete'] = ({ address }) =>
    api.get('/autocomplete/json', { params: { input: address } });

  const getPlaceDedails: PlacesApi['getPlaceDedails'] = ({ placeId }) =>
    api.get('/details/json', { params: { place_id: placeId } });

  const getPlacePhoto: PlacesApi['getPlacePhoto'] = ({ photoReference }) =>
    api.get('/photo', { params: { photo_reference: photoReference } });

  return Object.freeze({
    getAutocomplete,
    getPlaceDedails,
    getPlacePhoto,
  });
}
