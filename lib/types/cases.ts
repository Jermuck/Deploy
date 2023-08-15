import { appTypes } from '.';

export type Cases = {
  getPropertyInfo: (params: { address: { address: string; placeId: string } }) => Promise<appTypes.BuiltProperty>;
  autocompleteAddress: (params: { address: string }) => Promise<{ address: string; placeId: string }[]>;
  estimate: (params: { state: appTypes.EstimationState }) => { total: number };
};
