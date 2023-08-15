import { Controllers } from 'lib/types/controllers';
import { Cases } from 'lib/types/cases';
import { newAutocompleteAddressController } from './property/autocomplete';
import { newGetPropertyInfoController } from './property/get-info';
import { newEstimateController } from './estimations/estimate';

export function newControllers({ cases }: { cases: Cases }): Controllers {
  const { autocompleteAddress, getPropertyInfo, estimate } = cases;

  return Object.freeze({
    autocompleteAddressController: newAutocompleteAddressController({ autocompleteAddress }),
    getPropertyInfoController: newGetPropertyInfoController({ getPropertyInfo }),
    estimateController: newEstimateController({ estimate }),
  });
}
