export enum UserRole {
  SUPER_USER,
  ADMIN,
  APPLICANT
}

export interface User {
  id: number;
  firstName: string;
  middleNames?: string;
  lastName: string;
  email: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Applicant {
  applicantId: number;
  user: User;
  address: Address;
  occupation: string;
  mobileNumber: string;
  sex: UserSex;
  maritalStatus: MaritalStatus;
  dob: Date;
  nationality: string;
  numberOfDependents?: number;
}

export interface AuthDetails {
  email: string;
  password: string;
}

export interface RegistrationDetails {
  firstName: string;
  lastName: string;
  middleNames: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface DecodedToken {
  roles: UserRole[];
  userId: number;
  sub: string;
  iat: Date;
  exp: number;
}

export interface Address {
  street: string;
  suburb: string;
  city: string;
  country: string;
  postalCode?: string;
}

export enum UserSex {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  OTHER = 'OTHER'
}

export enum MaritalStatus {
  SINGLE = 'SINGLE',
  MARRIED = 'MARRIED',
  DIVORCED = 'DIVORCED',
  WIDOWED = 'WIDOWED'
}
