import { Cases } from 'lib/types/cases';
import { Services } from 'lib/types/services';
import { newEstimate } from './estimations/estimate';
import newAutocompleteAddress from './property/autocomplete';
import newGetPropertyInfo from './property/get-info';

export function newCases({ services }: { services: Services }): Cases {
  return Object.freeze({
    getPropertyInfo: newGetPropertyInfo({ attomApi: services.attomApi, streetviewApi: services.streetviewApi }),
    autocompleteAddress: newAutocompleteAddress({ placesApi: services.placesApi }),
    estimate: newEstimate(),
  });
}
