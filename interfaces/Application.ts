import { IAddress } from '.';

export interface IApplication {
  visitId: string;
  primary: IApplicant;
  secondaries: IApplicant[];
  dependents: IDependent[];
  leaseLength: number;
  moveInDate: Date;
  pets: {
    [key in IPetTypes]: IPet;
  },
  leaseLock: boolean;
}

export interface IApplicant {
  firstName: string;
  lastName: string;
  email: string;
  incomeVerifier: string;
  ssn: string;
  birthday: Date;
  address: IAddress;
  isInvalid?: boolean;
  key?: string;
}

export interface IDependent {
  firstName: string;
  lastName: string;
  birthday: Date;
  relation: string;
  key?: string;
}

export interface IPet {
  quantity: number;
  notes: string;
}

export type IPetTypes = 'cats' | 'dogs' | 'other';
