import { Services } from 'lib/types/services';
import { Cases } from 'lib/types/cases';

export default function newAutocompleteAddress({
  placesApi,
}: {
  placesApi: Services['placesApi'];
}): Cases['autocompleteAddress'] {
  return async function ({ address }) {
    const { predictions = [] } = await placesApi.getAutocomplete({ address });
    const addresses = predictions.map((prediction) => ({
      address: prediction.description,
      placeId: prediction.place_id,
    }));
    return addresses;
  };
}
