import { Services } from 'lib/types/services';
import { Cases } from 'lib/types/cases';
import { buildProperty } from '../../models';

export default function newGetPropertyInfo({
  attomApi,
  streetviewApi,
}: {
  attomApi: Services['attomApi'];
  streetviewApi: Services['streetviewApi'];
}): Cases['getPropertyInfo'] {
  function parseAttomApiProperty(property) {
    return {
      address: property.address?.oneLine,
      type: property.summary?.propClass,
      taxes: property.assessment?.tax?.taxAmt,
      totalSizeSqf: property.building?.size?.bldgSize,
      bedroomCount: property.building?.rooms?.beds,
      bathroomCount: property.building?.rooms?.bathsTotal,
      roofMaterialType: property.building?.construction?.roofCover,
      exteriorWallType: property.building?.construction?.wallType,
      groundFloorSizeSqf: property.building?.size?.groundFloorSize,
    };
  }

  async function fetchAttomApi({ address }) {
    const response = await attomApi.getPropertyExpandedProfile({ address });
    const apiProperty = response.property[0];
    if (!apiProperty) {
      return;
    }
    return parseAttomApiProperty(apiProperty);
  }

  // async function fetchPropertyPhoto({ placeId }) {
  //   console.log({ placeId });
  //   const details = await placesApi.getPlaceDedails({ placeId: placeId });
  //   const photos = details.result?.photos || [];
  //   console.dir({ details }, { depth: null });
  //   if (!photos.length) {
  //     return;
  //   }
  //   const res = await placesApi.getPlacePhoto({ photoReference: photos[0].photo_reference });
  //   console.log('PHOTO');
  //   console.log(res);
  // }

  async function fetchPropertyPhoto({ address }) {
    const res = await streetviewApi.getStreetView({ location: address });
    return Buffer.from(res, 'binary').toString('base64');
  }

  return async function ({ address }) {
    const apiProperty = await fetchAttomApi(address);
    if (!apiProperty) {
      throw new Error('No such property');
    }
    const photo = await fetchPropertyPhoto(address);
    const property = buildProperty(apiProperty);
    return { ...property.toJSON(), photo };
  };
}
