import { newEstimation } from '../../models';
import { Cases } from 'lib/types/cases';

export function newEstimate(): Cases['estimate'] {
  return function ({ state }) {
    const { property, transactionCosts, repairTeam } = state;
    if (!property || !transactionCosts || !repairTeam) {
      throw new Error('Invalid params');
    }
    const estimation = newEstimation({ property, transactionCosts, repairTeam });
    const total = estimation.calcTotal();
    return { total };
  };
}
