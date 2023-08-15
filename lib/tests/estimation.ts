import assert from 'assert';
import buildNewEstimation from '../models/estimation';
import { appTypes } from 'lib/types';

const rate = {
  workTime: 4,
  materialCost: 100,
  workCost: 50,
};
const rates: appTypes.EstimationRates = {
  roof: {
    shingles: rate,
    metal: rate,
  },
  facade: {
    brick: rate,
    vinylSiding: rate,
    woodSiding: rate,
    fiberCementSiding: rate,
    paint: rate,
  },
  exteriorDoors: {
    replacement: rate,
    paint: rate,
  },
  garageDoors: {
    replacement: {
      single: rate,
      double: rate,
    },
    paint: {
      single: rate,
      double: rate,
    },
  },
};
const emptyProperty: appTypes.PropertyState = {
  roof: {
    state: 'good',
    size: 0,
    type: 'shingles',
    percentage: 0,
  },
  facade: {
    state: 'good',
    size: 0,
    type: 'vinylSiding',
    percentage: 0,
  },
  exteriorDoors: {
    state: 'good',
    count: 0,
  },
  garageDoors: {
    state: 'good',
    count: 0,
  },
  terrace: {
    state: 'good',
    size: 0,
    percentage: 0,
  },
  windows: {
    state: 'good',
    count: 0,
    percentage: 0,
  },
  gutterSystems: {
    state: 'good',
  },
  indoorDismantling: {
    state: 'no',
    count: 0,
  },
  interiorWalls: {
    state: 'no',
    size: 0,
  },
  floorsWallsInsulation: {
    state: 'no',
    size: 0,
  },
  roofInsulation: {
    state: 'no',
    size: 0,
  },
  drywallInstallation: {
    state: 'no',
    size: 0,
  },
  putty: {
    state: 'no',
    size: 0,
  },
  interiorDoors: {
    state: 'good',
  },
  kitchen: {
    state: 'good',
    size: 0,
  },
  bathrooms: {
    state: 'good',
    toilets: 0,
    showers: 0,
    tiles: 0,
    vanity: 0,
    faucets: 0,
  },
  wallPainting: {
    state: 'no',
    size: 0,
  },
  ceilingPainting: {
    state: 'no',
    size: 0,
  },
  floor: {
    state: 'good',
    hardwood: 0,
    laminate: 0,
    tiles: 0,
    vinyl: 0,
    carpet: 0,
  },
  plumbing: {
    state: 'good',
    kitchenFaucetFixture: 0,
    hookupDishwasher: 0,
    fridgeWaterLine: 0,
  },
  electrical: {
    state: 'good',
    exhaustFan: 0,
    smokeDetectors: 0,
    outdoorLight: 0,
    ceilingLight: 0,
  },
  appliances: {
    state: 'good',
    fridge: 0,
    oven: 0,
    cooktop: 0,
    microwave: 0,
    dishwasher: 0,
    hood: 0,
  },
};
const emptyRepairTeam: appTypes.RepairTeamState = {
  isOwnRepairTeam: false,
  avgHourlyRate: 0,
  repairTeamTasks: {
    roofing: false,
    facadeInstallation: false,
    facadePainting: false,
    deckInstallation: false,
    windowFitting: false,
    gutterSystems: false,
    landscaping: false,
    interiorDemolition: false,
    wallConstruction: false,
    insulation: false,
    drywall: false,
    kitchenInstallation: false,
    tiling: false,
    plumbingInstallation: false,
    doorInstallation: false,
    wallAndCeilingPainting: false,
  },
};
const emptyTranasctionCosts: appTypes.TransactionCostsState = {
  homeInspectionFee: false,
  titleSearchInsurance: false,
  recordingFees: false,
  photography: false,
  staging: false,
};

const newEstimation = buildNewEstimation({ rates });

describe('estimation', () => {
  describe('calculations', () => {
    describe('roof', () => {
      it('good', () => {
        const property = structuredClone(emptyProperty);
        property.roof.state = 'good';
        property.roof.size = 1000;
        property.roof.percentage = 100;
        const estimation = newEstimation({
          property,
          repairTeam: emptyRepairTeam,
          transactionCosts: emptyTranasctionCosts,
        });
        assert.strictEqual(estimation.calcRoofCost(), 0);
      });
      it('repair with own team', () => {
        const property = structuredClone(emptyProperty);
        property.roof.state = 'repair';
        property.roof.size = 1000;
        property.roof.percentage = 50;
        const repairTeam = structuredClone(emptyRepairTeam);
        repairTeam.isOwnRepairTeam = true;
        repairTeam.avgHourlyRate = 50;
        repairTeam.repairTeamTasks.roofing = true;
        const estimation = newEstimation({
          property,
          repairTeam,
          transactionCosts: emptyTranasctionCosts,
        });
        assert.strictEqual(estimation.calcRoofCost(), 6250);
      });
      it('repair without own team', () => {
        const property = structuredClone(emptyProperty);
        property.roof.state = 'repair';
        property.roof.size = 900.54;
        property.roof.percentage = 12.3;
        const repairTeam = structuredClone(emptyRepairTeam);
        repairTeam.isOwnRepairTeam = false;
        repairTeam.avgHourlyRate = 50;
        repairTeam.repairTeamTasks.roofing = true;
        const estimation = newEstimation({
          property,
          repairTeam,
          transactionCosts: emptyTranasctionCosts,
        });
        assert.strictEqual(estimation.calcRoofCost(), 16614.96);
      });
      it('replacement', () => {
        const property = structuredClone(emptyProperty);
        property.roof.state = 'replacement';
        property.roof.size = 1000;
        property.roof.percentage = 20;
        const estimation = newEstimation({
          property,
          repairTeam: emptyRepairTeam,
          transactionCosts: emptyTranasctionCosts,
        });
        assert.strictEqual(estimation.calcRoofCost(), 150_000);
      });
    });
    describe('facade', () => {
      it('good', () => {
        const property = structuredClone(emptyProperty);
        property.facade.state = 'good';
        property.facade.size = 1000;
        property.facade.percentage = 20;
        const estimation = newEstimation({
          property,
          repairTeam: emptyRepairTeam,
          transactionCosts: emptyTranasctionCosts,
        });
        assert.strictEqual(estimation.calcFacadeCost(), 0);
      });
      it('repair with own team', () => {
        const property = structuredClone(emptyProperty);
        property.facade.state = 'repair';
        property.facade.size = 1000;
        property.facade.percentage = 50;
        const repairTeam = structuredClone(emptyRepairTeam);
        repairTeam.isOwnRepairTeam = true;
        repairTeam.avgHourlyRate = 50;
        repairTeam.repairTeamTasks.facadeInstallation = true;
        repairTeam.repairTeamTasks.facadePainting = true;
        const estimation = newEstimation({
          property,
          repairTeam,
          transactionCosts: emptyTranasctionCosts,
        });
        assert.strictEqual(estimation.calcFacadeCost(), 6250);
      });
      it('repair without own team', () => {
        const property = structuredClone(emptyProperty);
        property.facade.state = 'repair';
        property.facade.size = 900.54;
        property.facade.percentage = 12.3;
        const repairTeam = structuredClone(emptyRepairTeam);
        repairTeam.isOwnRepairTeam = true;
        repairTeam.avgHourlyRate = 50;
        repairTeam.repairTeamTasks.facadeInstallation = false;
        repairTeam.repairTeamTasks.facadePainting = false;
        const estimation = newEstimation({
          property,
          repairTeam,
          transactionCosts: emptyTranasctionCosts,
        });
        assert.strictEqual(estimation.calcFacadeCost(), 16614.96);
      });
      it('replacement', () => {
        const property = structuredClone(emptyProperty);
        property.facade.state = 'replacement';
        property.facade.size = 1000;
        property.facade.percentage = 20;
        const estimation = newEstimation({
          property,
          repairTeam: emptyRepairTeam,
          transactionCosts: emptyTranasctionCosts,
        });
        assert.strictEqual(estimation.calcFacadeCost(), 150_000);
      });
      it('paint with own team', () => {
        const property = structuredClone(emptyProperty);
        property.facade.state = 'paint';
        property.facade.size = 1000;
        property.facade.percentage = 50;
        const repairTeam = structuredClone(emptyRepairTeam);
        repairTeam.isOwnRepairTeam = true;
        repairTeam.avgHourlyRate = 50;
        repairTeam.repairTeamTasks.facadePainting = true;
        const estimation = newEstimation({
          property,
          repairTeam,
          transactionCosts: emptyTranasctionCosts,
        });
        assert.strictEqual(estimation.calcFacadeCost(), 12_500);
      });
      it('paint without own team', () => {
        const property = structuredClone(emptyProperty);
        property.facade.state = 'paint';
        property.facade.size = 900.54;
        property.facade.percentage = 12.3;
        const repairTeam = structuredClone(emptyRepairTeam);
        repairTeam.isOwnRepairTeam = false;
        repairTeam.avgHourlyRate = 50;
        repairTeam.repairTeamTasks.facadePainting = true;
        const estimation = newEstimation({
          property,
          repairTeam,
          transactionCosts: emptyTranasctionCosts,
        });
        assert.strictEqual(estimation.calcFacadeCost(), 135_081);
      });
    });
  });
});
