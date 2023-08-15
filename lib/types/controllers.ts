import { Request, Response } from 'express';

export type Controllers = {
  autocompleteAddressController: (req: Request, res: Response) => Promise<void>;
  getPropertyInfoController: (req: Request, res: Response) => Promise<void>;
  estimateController: (req: Request, res: Response) => void;
};
