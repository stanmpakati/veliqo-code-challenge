export interface InsuranceApplication {
  id: number;
  insuranceType: InsuranceType;
  applicationPlea?: string;
  startDate: Date;
  expiryDate?: Date;
  status: ApprovalStatus;
  denialNote?: string;
  applicantId: number;
  approvedBy?: number;
  approvalDate?: Date;
  createdAt: Date;
}

export interface InsuranceApplicationRequest {
  insuranceTypeId: number;
  applicationPlea?: string;
  startDate: Date;
  expiryDate?: Date;
  applicantId: number;
  status: ApprovalStatus.PENDING;
}

export interface InsuranceType {
  id: number;
  name: string;
  description: string;
  amount: number;
  currency: Currency;
  isActive: boolean;
  hasExpiryDate: boolean;
  paymentPeriod: PaymentPeriod;
  createdAt: Date;
}

export enum ApprovalStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  CANCELLED = 'CANCELLED'
}

export enum Currency {
  USD = 'USD',
  EUR = 'EUR',
  GBP = 'GBP',
  ZWL = 'ZWL',
  ZAR = 'ZAR',
  BWP = 'BWP'
}

export enum PaymentPeriod {
  DAILY = 'Day',
  WEEKLY = 'Week',
  MONTHLY = 'Month',
  YEAR_QUARTER = 'Year Quarter',
  YEARLY = 'Year'
}
