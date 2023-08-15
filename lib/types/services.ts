export type Services = {
  attomApi: Readonly<{
    getPropertyExpandedProfile: ({ address }: { address: string }) => Promise<any>;
  }>;
  placesApi: Readonly<{
    getAutocomplete: ({
      address,
    }: {
      address: string;
    }) => Promise<{ predictions: { description: string; place_id: string }[] }>;
    getPlaceDedails: ({
      placeId,
    }: {
      placeId: string;
    }) => Promise<{ result: { photos: { photo_reference: string }[] } }>;
    getPlacePhoto: ({ photoReference }: { photoReference: string }) => Promise<{ data: Buffer }>;
  }>;
  streetviewApi: Readonly<{
    getStreetView: (props: { location: string }) => Promise<string>;
  }>;
};
