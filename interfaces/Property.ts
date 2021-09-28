import { Coords } from 'google-map-react';

export interface IProperty {
  uuid: string;
  script: string;
  state: string;
  address: string;
  type: string;
  beds: number;
  baths: number;
  price: number;
  size: number;
  built: number;
  newConstruction: boolean;
  comesWith: string[];
  schools: ISchool[];
  coordinates: Coords,
}

export interface ISourceProperty {
  address: string;
  billOwnerPerson: string | null;
  deleted: boolean;
  empOwner: string;
  hoaUuid: string | null;
  houseDetails: ISourceHouseDetails;
  hubUuid: string | null;
  isPublic: true;
  market: string;
  electricityStatus: boolean;
  electricityVendor: string | null;
  gasStatus: boolean;
  gasVendor: string | null;
  sewerStatus: boolean;
  sewerVendor: string | null;
  trashStatus: boolean;
  trashVendor: string | null;
  waterStatus: boolean;
  waterVendor: string | null;
  uuid: string;
  vosState: string;
  zillowUrl: string | null;
}

export interface ISourceHouseDetails {
  addressFull: string;
  appliances: string;
  baths: number;
  beds: number;
  buildNew: boolean;
  builtYear: number;
  city: string;
  country: string;
  elementarySchool: string;
  middleSchool: string;
  highSchool: string;
  interior: string;
  exterior: string;
  internalFeatures: string[];
  externalFeatures: string[];
  floors: number;
  latitude: number;
  longitude: number;
  listingData: ISourceListingData;
  livingSquareFoot: number;
  lotSizeSf: number;
  marketId: string;
  organizationUuid: string;
  parkingCovered: boolean | null;
  parkingEnclosedAttached: number;
  parkingEnclosedDetached: number;
  parkingOpen: boolean | null;
  parkingRemarks: string[];
  sfrType: string | null;
  state: string;
  street: string;
  streetNumber: string;
  submarketId: string;
  unit: string;
  utilities: string;
  uuid: string;
  zip: string;
}

export interface ISourceListingData {
  listPrice: number;
  listingActive: boolean;
  listingAgentId: string;
  listingType: string;
  picketAgent: string;
  sourceType: string;
}

export interface ISchool {
  type: 'high' | 'middle' | 'elementary';
  name: string;
}

export interface IAddress {
  zip: string;
  city: string;
  state: string;
  street: string;
  streetNumber?: number;
}

export interface ISelectedProperty {
  uuid: string,
  event: 'hover' | 'click',
}
