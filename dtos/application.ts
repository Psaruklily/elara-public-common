import {
  IApplicant,
  IApplication,
  IDependent,
  IPet,
  IPetTypes,
  IVisit,
} from '../interfaces';

export default class ApplicationDTO implements IApplication {
  visitId: string;

  primary: IApplicant;

  secondaries: IApplicant[];

  dependents: IDependent[];

  leaseLength: number;

  moveInDate: Date;

  pets: {
    [key in IPetTypes]: IPet;
  }

  token: string;

  leaseLock: boolean;

  propertyUuid: string;

  constructor(visit: IVisit, form: IApplication, token: string) {
    this.visitId = visit.uuid;
    this.primary = {
      firstName: visit.person.firstName,
      lastName: visit.person.lastName,
      email: visit.person.email as string,
      incomeVerifier: form.primary.incomeVerifier,
      ssn: form.primary.ssn,
      birthday: form.primary.birthday,
      address: form.primary.address,
    };
    this.secondaries = form.secondaries?.map((applicant: IApplicant) => ({
      firstName: applicant.firstName,
      lastName: applicant.lastName,
      email: applicant.email,
      incomeVerifier: applicant.incomeVerifier,
      ssn: applicant.ssn,
      birthday: applicant.birthday,
      address: applicant.address,
    })) || [];
    this.dependents = form.dependents?.map((dependent: IDependent) => ({
      firstName: dependent.firstName,
      lastName: dependent.lastName,
      birthday: dependent.birthday,
      relation: dependent.relation,
    })) || [];
    this.leaseLength = form.leaseLength;
    this.moveInDate = form.moveInDate;
    this.pets = form.pets;
    this.token = token;
    this.leaseLock = form.leaseLock;
    this.propertyUuid = visit.property.uuid;
  }
}
