import { ISourceProperty, IPerson, IProperty } from '.';

export interface ISourceVisit {
  uuid: string,
  personUuid: string,
  houseUuid: string,
  beginTs: Date,
  state: IVisitState,
  house_uuid: string,
  house: ISourceProperty,
  person: IPerson,
}

export interface IVisit {
  uuid: string,
  personUuid: string,
  houseUuid: string,
  beginTs: Date,
  state: IVisitState,
  property: IProperty,
  person: IPerson,
}

export interface IVisitCreateRequestBody {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  propertyUuid: string;
  beginTs: Date;
  timezone: string;
}

export type IVisitState = 'REQUESTED' | 'CANCELED_CUSTOMER' | 'CANCELED_EMPLOYEE' | 'NO_SHOW' | 'IN_PROGRESS' | 'FINISHED';
