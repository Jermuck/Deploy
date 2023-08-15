import { Request, Response } from 'express';
import { Cases } from 'lib/types/cases';

export function newGetPropertyInfoController({ getPropertyInfo }: { getPropertyInfo: Cases['getPropertyInfo'] }) {
  return async function (
    req: Request<any, any, any, { address: { address: string; placeId: string } }>,
    res: Response
  ) {
    try {
      const { address } = req.query;
      const property = await getPropertyInfo({ address });
      res.send(property);
    } catch (err) {
      console.error('Error: Getting property info', err);
      res.sendStatus(503);
    }
  };
}
