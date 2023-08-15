import constructionRates from '../data/estimation-rates';

export namespace appTypes {
  export type Property = {
    hoa?: number;
    type?: string;
    taxes?: number;
    photo?: string;
    address: string;
    totalSizeSqf?: number;
    bedroomCount?: number;
    bathroomCount?: number;
    groundFloorSize?: number;
    roofMaterialType?: string;
    exteriorWallType?: string;
    groundFloorSizeSqf?: number;
  };

  export type BuiltProperty = {
    hoa?: number;
    type?: string;
    depth?: number;
    width?: number;
    taxes?: number;
    photo?: string;
    volume?: number;
    height?: number;
    address?: string;
    roofSqf?: number;
    facadeSqf?: number;
    overlaySqf?: number;
    floorsCount?: number;
    ceilingSize?: number;
    flooringSize?: number;
    windowsCount?: number;
    totalSizeSqf?: number;
    bedroomCount?: number;
    bathroomCount?: number;
    roofMaterialType?: string;
    exteriorWallType?: string;
  };

  export type EstimationRates = typeof constructionRates;

  export type EstimationState = {
    repairTeam?: RepairTeamState;
    transactionCosts?: TransactionCostsState;
    property?: PropertyState;
  };

  export type RepairTeamState = {
    isOwnRepairTeam: boolean;
    avgHourlyRate: number;
    repairTeamTasks: {
      roofing: boolean;
      facadeInstallation: boolean;
      facadePainting: boolean;
      deckInstallation: boolean;
      windowFitting: boolean;
      gutterSystems: boolean;
      landscaping: boolean;
      interiorDemolition: boolean;
      wallConstruction: boolean;
      insulation: boolean;
      drywall: boolean;
      kitchenInstallation: boolean;
      tiling: boolean;
      plumbingInstallation: boolean;
      doorInstallation: boolean;
      garageDoorInstallation: boolean;
      wallAndCeilingPainting: boolean;
      floorInstallation: boolean;
    };
  };

  export type TransactionCostsState = {
    homeInspectionFee: boolean;
    titleSearchInsurance: boolean;
    recordingFees: boolean;
    photography: boolean;
    staging: boolean;
  };

  export type PropertyState = {
    roof: {
      state: 'good' | 'repair' | 'replacement';
      size: number;
      type: 'shingles' | 'metal' | 'clayTiles';
      percentage: number;
    };
    facade: {
      state: 'good' | 'repair' | 'replacement' | 'paint';
      size: number;
      type: 'vinylSiding' | 'woodSiding' | 'brick' | 'fiberCementSiding';
      percentage: number;
    };
    exteriorDoors: {
      state: 'good' | 'paint' | 'replacement';
      count: number;
    };
    garageDoors: {
      state: 'good' | 'replacement' | 'paint';
      count: number;
    };
    terrace: {
      state: 'good' | 'repair' | 'paint' | 'replacement';
      size: number;
      percentage: number;
      withJoist: boolean;
    };
    windows: {
      state: 'good' | 'replacement';
      count: number;
    };
    gutterSystems: {
      state: 'good' | 'replacement';
      size: number;
    };
    indoorDismantling: {
      state: 'yes' | 'no';
      count: number;
    };
    interiorWalls: {
      state: 'yes' | 'no';
      size: number;
    };
    floorsWallsInsulation: {
      state: 'yes' | 'no';
      size: number;
    };
    roofInsulation: {
      state: 'yes' | 'no';
      size: number;
    };
    drywallInstallation: {
      state: 'yes' | 'no';
      size: number;
    };
    putty: {
      state: 'yes' | 'no';
      size: number;
    };
    interiorDoors: {
      state: 'good' | 'paint' | 'replacement';
      count: number;
    };
    kitchen: {
      state: 'good' | 'paint' | 'replacement';
      size: number;
    };
    bathrooms: {
      state: 'good' | 'replacement';
      toilets: number;
      showers: number;
      tiles: number;
      vanity: number;
      faucets: number;
    };
    wallPainting: {
      state: 'yes' | 'no';
      size: number;
    };
    ceilingPainting: {
      state: 'yes' | 'no';
      size: number;
    };
    floor: {
      state: 'good' | 'replacement';
      hardwood: number;
      laminate: number;
      tiles: number;
      vinyl: number;
      carpet: number;
    };
    plumbing: {
      state: 'good' | 'replacement';
      kitchenFaucetFixture: number;
      hookupDishwasher: number;
      fridgeWaterLine: number;
    };
    electrical: {
      state: 'good' | 'replacement';
      exhaustFan: number;
      smokeDetectors: number;
      outdoorLight: number;
      ceilingLight: number;
    };
    appliances: {
      state: 'good' | 'replacement';
      fridge: number;
      oven: number;
      cooktop: number;
      microwave: number;
      dishwasher: number;
      hood: number;
    };
  };
}
