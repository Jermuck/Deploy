import { appTypes } from 'lib/types';

const AVERAGE_FLOOR_HEIGHT_INSIDE = 9;
const AVERAGE_FLOOR_HEIGHT_OUTSIDE = 10;
const AVERAGE_WINDOWS_COUNT_PER_FLOOR = 7;
const AVERAGE_WINDOWS_SIZE = 16;

function round(value: number) {
  return value % 1 >= 0.5 ? Math.ceil(value) : Math.floor(value);
}

export default function newBuildProperty() {
  return function ({
    hoa,
    type,
    taxes,
    photo,
    address,
    totalSizeSqf,
    bedroomCount,
    bathroomCount,
    roofMaterialType,
    exteriorWallType,
    groundFloorSizeSqf,
  }: Partial<appTypes.Property>) {
    if (!address) {
      throw new Error('Property must have an address');
    }

    const floorsCount = totalSizeSqf && groundFloorSizeSqf ? round(totalSizeSqf / groundFloorSizeSqf) : undefined;
    const volume =
      floorsCount && groundFloorSizeSqf ? groundFloorSizeSqf * AVERAGE_FLOOR_HEIGHT_INSIDE * floorsCount : undefined;
    const height = floorsCount ? AVERAGE_FLOOR_HEIGHT_OUTSIDE * floorsCount + 3 : undefined;
    const depth = height;
    const width = height;
    const windowsCount = floorsCount ? AVERAGE_WINDOWS_COUNT_PER_FLOOR * floorsCount : undefined;
    // ширина дома*высота дома*количество сторон (2 - если таунхаус, 4 - если отдельностоящий дом) - количество окон * 16
    const facadeSqf =
      width && height && windowsCount ? width * height * 2 - windowsCount * AVERAGE_WINDOWS_SIZE : undefined;
    const flooringSize = totalSizeSqf;
    const ceilingSize = flooringSize;
    const roofSqf = groundFloorSizeSqf;
    const overlaySqf = flooringSize && floorsCount ? flooringSize / floorsCount : undefined;

    return Object.freeze({
      getHoa: () => hoa,
      getType: () => type,
      getDepth: () => depth,
      getWidth: () => width,
      getTaxes: () => taxes,
      getPhoto: () => photo,
      getVolume: () => volume,
      getHeight: () => height,
      getAddress: () => address,
      getRoofSqf: () => roofSqf,
      getFacadeSqf: () => facadeSqf,
      getOverlaySqf: () => overlaySqf,
      getCeilingSize: () => ceilingSize,
      getFloorsCount: () => floorsCount,
      getWindowsCount: () => windowsCount,
      getFlooringSize: () => flooringSize,
      getTotalSizeSqf: () => totalSizeSqf,
      getBedroomCount: () => bedroomCount,
      getBathroomCount: () => bathroomCount,
      getRoofMaterialType: () => roofMaterialType,
      getExteriorWallType: () => exteriorWallType,
      toJSON: () => ({
        hoa,
        type,
        depth,
        width,
        taxes,
        photo,
        volume,
        height,
        address,
        roofSqf,
        facadeSqf,
        overlaySqf,
        floorsCount,
        ceilingSize,
        flooringSize,
        windowsCount,
        totalSizeSqf,
        bedroomCount,
        bathroomCount,
        roofMaterialType,
        exteriorWallType,
      }),
    });
  };
}
