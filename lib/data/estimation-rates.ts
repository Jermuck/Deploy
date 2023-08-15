/*
    workCost: $ per sq.ft.
    workTime: sq.ft. or count per hour
    materialCost: $ per sq.ft.
*/

export default {
  roof: {
    shingles: {
      workCost: 3.5,
      workTime: 50,
      materialCost: 1.5,
    },
    metal: {
      workCost: 5.5,
      workTime: 50,
      materialCost: 2,
    },
  },
  facade: {
    brick: {
      workCost: 20,
      workTime: 10,
      materialCost: 10,
    },
    vinylSiding: {
      workCost: 3.34,
      workTime: 60,
      materialCost: 2.7,
    },
    woodSiding: {
      workCost: 4.01,
      workTime: 35,
      materialCost: 5.5,
    },
    fiberCementSiding: {
      workCost: 3.97,
      workTime: 30,
      materialCost: 5.69,
    },
    paint: {
      workCost: 0.8,
      workTime: 700,
      materialCost: 0.4,
    },
  },
  exteriorDoors: {
    replacement: {
      workCost: 220,
      workTime: 4,
      materialCost: 758,
    },
    paint: {
      workCost: 80,
      workTime: 1,
      materialCost: 10,
    },
  },
  garageDoors: {
    replacement: {
      single: {
        workCost: 450,
        workTime: 5,
        materialCost: 1819,
      },
      double: {
        workCost: 520,
        workTime: 6,
        materialCost: 2320,
      },
    },
    paint: {
      single: {
        workCost: 120,
        workTime: 1,
        materialCost: 50,
      },
      double: {
        workCost: 240,
        workTime: 2,
        materialCost: 100,
      },
    },
  },
  terrace: {
    deck: {
      workCost: 15,
      workTime: 50,
      materialCost: 25,
    },
    joist: {
      workCost: 9,
      workTime: 15,
      materialCost: 6,
    },
    paint: {
      workCost: 0.96,
      workTime: 400,
      materialCost: 0.36,
    },
  },
  windows: {
    workCost: 157,
    workTime: 3,
    materialCost: 500,
  },
  gutters: {
    workCost: 3.84,
    workTime: 20,
    materialCost: 7.93,
  },
  indoorDismantling: {
    workCost: 30,
  },
  interiorWalls: {
    workCost: 7,
    workTime: 8,
    materialCost: 13,
  },
  insulation: {
    workCost: 0.62,
    workTime: 100,
    materialCost: 1.48,
  },
  insulationRoof: {
    workCost: 0.43,
    workTime: 120,
    materialCost: 1.96,
  },
  installationDrywall: {
    workCost: 0.85,
    workTime: 120,
    materialCost: 0.5,
  },
  putty: {
    workCost: 1.7,
    workTime: 60,
    materialCost: 0.3,
  },
  doors: {
    replacement: {
      workCost: 150,
      workTime: 2,
      materialCost: 220,
    },
    paint: {
      workCost: 80,
      workTime: 1,
      materialCost: 10,
    },
  },
  kitchen: {
    replacement: {
      workCost: 100,
      workTime: 56,
      materialCost: 250,
    },
    paint: {
      workCost: 30,
      workTime: 16,
      materialCost: 10,
    },
  },
  bathrooms: {
    toilets: {
      workCost: 226,
      workTime: 3,
      materialCost: 472,
    },
    showers: {
      workCost: 3180,
      workTime: 25,
      materialCost: 2836,
    },
    tiles: {
      workCost: 10,
      workTime: 10,
      materialCost: 5.3,
    },
    vanity: {
      workCost: 400,
      workTime: 2,
      materialCost: 600,
    },
    faucets: {
      workCost: 85,
      workTime: 1,
      materialCost: 255,
    },
  },
  wallPainting: {
    workCost: 0.96,
    workTime: 300,
    materialCost: 0.36,
  },
  ceilingPainting: {
    workCost: 0.96,
    workTime: 300,
    materialCost: 0.36,
  },
  floor: {
    hardwood: {
      workCost: 10,
      workTime: 30,
      materialCost: 8.89,
    },
    laminate: {
      workCost: 3,
      workTime: 20,
      materialCost: 3.09,
    },
    tiles: {
      workCost: 10,
      workTime: 10,
      materialCost: 5.3,
    },
    vinyl: {
      workCost: 1.84,
      workTime: 30,
      materialCost: 1.86,
    },
    carpet: {
      workCost: 1.1,
      workTime: 50,
      materialCost: 2.5,
    },
  },
};
