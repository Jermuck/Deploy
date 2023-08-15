import { Request, Response } from 'express';
import { Cases } from 'lib/types/cases';

export function newEstimateController({ estimate }: { estimate: Cases['estimate'] }) {
  return function (req: Request, res: Response) {
    try {
      const { property, transactionCosts, repairTeam } = req.body;
      const estimation = estimate({ state: { property, transactionCosts, repairTeam } });
      res.send({ estimation });
    } catch (err) {
      console.error('Error: Estimate', err);
      res.sendStatus(503);
    }
  };
}
