import express from 'express';
import { Controllers } from 'lib/types/controllers';
import {Request, Response} from 'express';

export function makeRouter({ controllers }: { controllers: Controllers }) {
  const router = express.Router();

  router.get('/address/autocomplete', controllers.autocompleteAddressController);
  router.get('/property/info', controllers.getPropertyInfoController);
  router.post('/estimate', controllers.estimateController);
  router.post( '/',(_: Request, res: Response) => {
    res.send('Server work...');
  });
  return router;
}
