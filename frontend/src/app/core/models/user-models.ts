export enum UserRole {
  SUPER_USER,
  ADMIN,
  APPLICANT
}

export interface User {
  id: number;
  firstName: string;
  middleNames: string;
  lastName: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
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
