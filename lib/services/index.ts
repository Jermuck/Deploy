import { Services } from 'lib/types/services';
import { newAttomApi } from './attom-api';
import { newPlacesApi } from './places-api';
import { newStreetviewApi } from './streetview-api';

export function newServices(): Services {
  return Object.freeze({
    attomApi: newAttomApi(),
    placesApi: newPlacesApi(),
    streetviewApi: newStreetviewApi(),
  });
}
