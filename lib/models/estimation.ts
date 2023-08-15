import { appTypes } from 'lib/types';

type Props = {
  property: appTypes.PropertyState;
  transactionCosts: appTypes.TransactionCostsState;
  repairTeam: appTypes.RepairTeamState;
};

const fixedNumber = (fn: () => number) => () => Number(fn().toFixed(2));

export default function buildNewEstimation({ rates }: { rates: appTypes.EstimationRates }) {
  function validateProperty(property: appTypes.PropertyState) {
    //
  }
  function validateTransactionCosts(transactionCosts: appTypes.TransactionCostsState) {
    //
  }
  function validateRepairTeam(repairTeam: appTypes.RepairTeamState) {
    //
  }

  return function ({ property, transactionCosts, repairTeam }: Props) {
    validateProperty(property);
    validateTransactionCosts(transactionCosts);
    validateRepairTeam(repairTeam);

    const { isOwnRepairTeam, avgHourlyRate, repairTeamTasks } = repairTeam;

    const calcRoof = () => {
      const { state, size, type, percentage } = property.roof;
      const rate = rates.roof[type];
      if (state === 'good') {
        return 0;
      }
      const isHandledByOwnTeam = isOwnRepairTeam && repairTeamTasks.roofing;
      const repairSize = state === 'replacement' ? size : (size * percentage) / 100;
      if (isHandledByOwnTeam) {
        return rate.materialCost * repairSize + (repairSize / rate.workTime) * avgHourlyRate;
      }
      return (rate.materialCost + rate.workCost) * repairSize;
    };

    const calcFacade = () => {
      const { state, size, type, percentage } = property.facade;
      const rate = state === 'paint' ? rates.facade.paint : rates.facade[type];
      if (state === 'good') {
        return 0;
      }
      const repairSize = state === 'repair' ? (size * percentage) / 100 : size;
      const isHandledByOwnTeam =
        state === 'paint' ? repairTeamTasks.facadePainting : repairTeamTasks.facadeInstallation;
      if (isOwnRepairTeam && isHandledByOwnTeam) {
        return rate.materialCost * repairSize + (repairSize / rate.workTime) * avgHourlyRate;
      }
      return (rate.materialCost + rate.workCost) * repairSize;
    };

    const calcExteriorDoors = () => {
      const { state, count } = property.exteriorDoors;
      const rate = rates.exteriorDoors[state];
      if (state === 'good') {
        return 0;
      }
      if (isOwnRepairTeam && repairTeamTasks.doorInstallation) {
        return rate.workTime * avgHourlyRate * count + rate.materialCost * count;
      }
      return (rate.materialCost + rate.workCost) * count;
    };

    const calcGarageDoors = () => {
      const { state, count } = property.garageDoors;
      if (state === 'good') {
        return 0;
      }
      const rate = count >= 2 ? rates.garageDoors[state].double : rates.garageDoors[state].single;
      if (isOwnRepairTeam && repairTeamTasks.garageDoorInstallation) {
        return rate.workTime * avgHourlyRate * count + rate.materialCost * count;
      }
      return (rate.materialCost + rate.workCost) * count;
    };

    const calcTerrace = () => {
      const { state, size, percentage, withJoist } = property.terrace;
      if (state === 'good') {
        return 0;
      }
      const joistRate = rates.terrace.joist;
      const rate = state === 'paint' ? rates.terrace.paint : rates.terrace.deck;

      const repairSize = state === 'repair' ? (size * percentage) / 100 : size;

      if (isOwnRepairTeam && repairTeamTasks.deckInstallation) {
        const cost = rate.materialCost * repairSize + (repairSize / rate.workTime) * avgHourlyRate;
        if (state === 'replacement' && withJoist) {
          const joistCost = joistRate.materialCost * repairSize + (repairSize / joistRate.workTime) * avgHourlyRate;
          return cost + joistCost;
        }
        return cost;
      }

      const cost = (rate.materialCost + rate.workCost) * size;
      if (state === 'replacement' && withJoist) {
        const joistCost = (joistRate.materialCost + joistRate.workCost) * repairSize;
        return cost + joistCost;
      }
      return cost;
    };

    const calcWindows = () => {
      const { state, count } = property.windows;
      const rate = rates.windows;
      if (state === 'good') {
        return 0;
      }
      if (isOwnRepairTeam && repairTeamTasks.windowFitting) {
        return rate.workTime * avgHourlyRate * count + rate.materialCost * count;
      }
      return (rate.materialCost + rate.workCost) * count;
    };

    const calcGutterSystems = () => {
      const { state, size } = property.gutterSystems;
      const rate = rates.gutters;
      if (state === 'good') {
        return 0;
      }
      if (isOwnRepairTeam && repairTeamTasks.gutterSystems) {
        return rate.materialCost * size + (size / rate.workTime) * avgHourlyRate;
      }
      return (rate.materialCost + rate.workCost) * size;
    };

    const calcIndoorDismantling = () => {
      const { state, count } = property.indoorDismantling;
      const rate = rates.indoorDismantling;
      if (state === 'no') {
        return 0;
      }
      if (isOwnRepairTeam && repairTeamTasks.interiorDemolition) {
        return count * avgHourlyRate * 70;
      }
      return count * rate.workCost * 70;
    };

    const calcInteriorWalls = () => {
      const { state, size } = property.interiorWalls;
      const rate = rates.interiorWalls;
      if (state === 'no') {
        return 0;
      }
      if (isOwnRepairTeam && repairTeamTasks.wallConstruction) {
        return rate.materialCost * size + (size / rate.workTime) * avgHourlyRate;
      }
      return (rate.materialCost + rate.workCost) * size;
    };

    const calcInsulation = () => {
      const { state, size } = property.floorsWallsInsulation;
      const rate = rates.insulation;
      if (state === 'no') {
        return 0;
      }
      if (isOwnRepairTeam && repairTeamTasks.insulation) {
        return rate.materialCost * size + (size / rate.workTime) * avgHourlyRate;
      }
      return (rate.materialCost + rate.workCost) * size;
    };

    const calcInsulationRoof = () => {
      const { state, size } = property.roofInsulation;
      const rate = rates.insulationRoof;
      if (state === 'no') {
        return 0;
      }
      if (isOwnRepairTeam && repairTeamTasks.insulation) {
        return rate.materialCost * size + (size / rate.workTime) * avgHourlyRate;
      }
      return (rate.materialCost + rate.workCost) * size;
    };

    const calcInstallationDrywall = () => {
      const { state, size } = property.drywallInstallation;
      const rate = rates.installationDrywall;
      if (state === 'no') {
        return 0;
      }
      if (isOwnRepairTeam && repairTeamTasks.drywall) {
        return rate.materialCost * size + (size / rate.workTime) * avgHourlyRate;
      }
      return (rate.materialCost + rate.workCost) * size;
    };

    const calcPutty = () => {
      const { state, size } = property.putty;
      const rate = rates.putty;
      if (state === 'no') {
        return 0;
      }
      if (isOwnRepairTeam && repairTeamTasks.drywall) {
        return rate.materialCost * size + (size / rate.workTime) * avgHourlyRate;
      }
      return (rate.materialCost + rate.workCost) * size;
    };

    const calcInteriorDoors = () => {
      const { state, count } = property.interiorDoors;
      const rate = rates.doors[state];
      if (state === 'good') {
        return 0;
      }
      const handledByOwnTeam =
        state === 'replacement'
          ? isOwnRepairTeam && repairTeamTasks.doorInstallation
          : isOwnRepairTeam && repairTeamTasks.wallAndCeilingPainting;

      if (handledByOwnTeam) {
        return rate.workTime * avgHourlyRate * count + rate.materialCost * count;
      }
      return (rate.materialCost + rate.workCost) * count;
    };

    const calcKitchen = () => {
      const { state, size } = property.kitchen;
      const rate = rates.kitchen[state];
      if (state === 'good') {
        return 0;
      }
      if (isOwnRepairTeam && repairTeamTasks.kitchenInstallation) {
        return rate.materialCost * size + (size / rate.workTime) * avgHourlyRate;
      }
      return (rate.materialCost + rate.workCost) * size;
    };

    const calcBathrooms = () => {
      const { state, toilets, showers, tiles, vanity, faucets } = property.bathrooms;
      const rate = rates.bathrooms;
      if (state === 'good') {
        return 0;
      }
      const rttMapping = {
        toilets: repairTeamTasks.plumbingInstallation,
        showers: repairTeamTasks.tiling,
        tiles: repairTeamTasks.tiling,
        vanity: repairTeamTasks.kitchenInstallation,
        faucets: repairTeamTasks.plumbingInstallation,
      };
      const counts = Object.entries({ vanity, faucets, showers }).reduce((acc, [key, count]) => {
        if (isOwnRepairTeam && rttMapping[key]) {
          return acc + rate[key].workTime * avgHourlyRate * count + rate[key].materialCost * count;
        }
        return acc + (rate[key].materialCost + rate[key].workCost) * count;
      }, 0);
      const sqfts = Object.entries({ toilets, tiles }).reduce((acc, [key, size]) => {
        if (isOwnRepairTeam && rttMapping[key]) {
          return acc + rate[key].materialCost * size + (size / rate[key].workTime) * avgHourlyRate;
        }
        return acc + (rate[key].materialCost + rate[key].workCost) * size;
      }, 0);
      return counts + sqfts;
    };

    const calcWallPainting = () => {
      const { state, size } = property.wallPainting;
      const rate = rates.wallPainting;
      if (state === 'no') {
        return 0;
      }
      if (isOwnRepairTeam && repairTeamTasks.wallAndCeilingPainting) {
        return rate.materialCost * size + (size / rate.workTime) * avgHourlyRate;
      }
      return (rate.materialCost + rate.workCost) * size;
    };

    const calcCeilingPainting = () => {
      const { state, size } = property.ceilingPainting;
      const rate = rates.ceilingPainting;
      if (state === 'no') {
        return 0;
      }
      if (isOwnRepairTeam && repairTeamTasks.wallAndCeilingPainting) {
        return rate.materialCost * size + (size / rate.workTime) * avgHourlyRate;
      }
      return (rate.materialCost + rate.workCost) * size;
    };

    const calcFloor = () => {
      const { state, ...items } = property.floor;
      const rate = rates.floor;
      if (state === 'good') {
        return 0;
      }
      const rttMapping = {
        hardwood: repairTeamTasks.floorInstallation,
        laminate: repairTeamTasks.floorInstallation,
        tiles: repairTeamTasks.tiling,
        vinyl: repairTeamTasks.floorInstallation,
        carpet: repairTeamTasks.floorInstallation,
      };
      return Object.entries(items).reduce((acc, [key, size]) => {
        if (isOwnRepairTeam && rttMapping[key]) {
          return acc + rate[key].materialCost * size + (size / rate[key].workTime) * avgHourlyRate;
        }
        return acc + (rate[key].materialCost + rate[key].workCost) * size;
      }, 0);
    };

    const calcTotal = () => {
      return [
        calcRoof,
        calcFacade,
        calcExteriorDoors,
        calcGarageDoors,
        calcTerrace,
        calcWindows,
        calcGutterSystems,
        calcIndoorDismantling,
        calcInteriorWalls,
        calcInsulation,
        calcInsulationRoof,
        calcInstallationDrywall,
        calcPutty,
        calcInteriorDoors,
        calcKitchen,
        calcBathrooms,
        calcWallPainting,
        calcCeilingPainting,
        calcFloor,
      ].reduce((acc, fn) => acc + Number(fn().toFixed(2)), 0);
    };

    return Object.freeze({
      calcRoof: fixedNumber(calcRoof),
      calcFacade: fixedNumber(calcFacade),
      calcExteriorDoors: fixedNumber(calcExteriorDoors),
      calcGarageDoor: fixedNumber(calcGarageDoors),
      calcTerrace: fixedNumber(calcTerrace),
      calcWindows: fixedNumber(calcWindows),
      calcGutterSystems: fixedNumber(calcGutterSystems),
      calcIndoorDismantling: fixedNumber(calcIndoorDismantling),
      calcInteriorWalls: fixedNumber(calcInteriorWalls),
      calcInsulation: fixedNumber(calcInsulation),
      calcInsulationRoof: fixedNumber(calcInsulationRoof),
      calcInstallationDrywall: fixedNumber(calcInstallationDrywall),
      calcDoors: fixedNumber(calcInteriorDoors),
      calcKitchen: fixedNumber(calcKitchen),
      calcBathrooms: fixedNumber(calcBathrooms),
      calcWallPainting: fixedNumber(calcWallPainting),
      calcCeilingPainting: fixedNumber(calcCeilingPainting),
      calcFloor: fixedNumber(calcFloor),
      calcPutty: fixedNumber(calcPutty),
      calcTotal: fixedNumber(calcTotal),
    });
  };
}
