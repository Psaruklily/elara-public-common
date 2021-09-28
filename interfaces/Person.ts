export interface IPerson {
  uuid?: string,
  email?: string,
  firstName: string,
  lastName: string,
  middleName?: string,
  shortName?: string,
  organizationUuid?: string,
  organizationPosition?: string,
  keycloakId?: string,
  phoneCode?: string,
  phone?: string,
  legalName?: string,
  address?: string,
  billingAddress?: string,
  additionalAddresses?: any,
  additionalInfo?: string,
  timezone?: string,
  deleted?: boolean,
  verificationState?: IVerificationState,
  verificationSessionId?: string,
  createdAt?: Date,
  updatedAt?: Date
}

export type IVerificationState = 'NOT_REQUESTED' | 'CANCELED' | 'REQUIRES_INPUT' | 'SESSION_CREATED' | 'VERIFIED' | 'VERIFICATION_FAILED';
