import express from 'express';
import { Controllers } from 'lib/types/controllers';

export function makeRouter({ controllers }: { controllers: Controllers }) {
  const router = express.Router();

  router.get('/address/autocomplete', controllers.autocompleteAddressController);
  router.get('/property/info', controllers.getPropertyInfoController);
  router.post('/estimate', controllers.estimateController);

  return router;
}
