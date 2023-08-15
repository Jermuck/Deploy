import { Request, Response } from 'express';
import { Cases } from 'lib/types/cases';

export function newAutocompleteAddressController({
  autocompleteAddress,
}: {
  autocompleteAddress: Cases['autocompleteAddress'];
}) {
  return async function (req: Request<any, any, any, { address: string }>, res: Response) {
    try {
      const { address } = req.query;
      const addresses = await autocompleteAddress({ address });
      res.send(addresses);
    } catch (err) {
      console.error('Error: Address autocomplete', err);
    }
  };
}
