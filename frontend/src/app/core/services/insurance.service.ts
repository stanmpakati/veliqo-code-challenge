import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  ApprovalStatus,
  Currency,
  InsuranceApplication,
  InsuranceApplicationRequest,
  InsuranceType,
  PaymentPeriod
} from '@ui-core/models/insurance-models';
import { environment } from '@ui-environments/environment';
import { UserService } from './user.service';
import { PaginatedResponse, PaginatorOptions } from '@ui-core/models/helper-models';
import { of, Observable } from 'rxjs';

const insuranceUrl = `${environment.INSURANCE_URL}/insurance-type`;
const insuranceApplicationUrl = `${environment.INSURANCE_URL}/insurance-application`;

@Injectable({
  providedIn: 'root'
})
export class InsuranceService {
  applicantId: number;

  constructor(
    private http: HttpClient,
    private userService: UserService
  ) {
    this.applicantId = +this.userService.getApplicantId;
  }

  getApplications(forApplicant = true, pageOptions: PaginatorOptions, query = {}) {
    let queryParams: {} = { ...pageOptions, ...query };
    if (forApplicant) queryParams = { ...queryParams, applicantId: this.applicantId };
    return this.http.get<PaginatedResponse<InsuranceApplication>>(`${insuranceApplicationUrl}`, { params: this.pageParams(queryParams) });
    // return of({
    //   data: [
    //     {
    //       id: 1,
    //       insuranceType: {
    //         id: 1,
    //         name: 'Vehicle',
    //         description: 'Some Description',
    //         amount: 50,
    //         currency: Currency.USD,
    //         isActive: true,
    //         hasExpiryDate: false,
    //         paymentPeriod: PaymentPeriod.MONTHLY,
    //         createdAt: new Date()
    //       },
    //       applicationPlea: 'Please please',
    //       startDate: new Date(),
    //       status: ApprovalStatus.PENDING,
    //       applicantId: 3,
    //       createdAt: new Date()
    //     },
    //     {
    //       id: 2,
    //       insuranceType: {
    //         id: 2,
    //         name: 'Travel',
    //         description: 'Some Description',
    //         amount: 5,
    //         currency: Currency.USD,
    //         isActive: true,
    //         hasExpiryDate: true,
    //         paymentPeriod: PaymentPeriod.DAILY,
    //         createdAt: new Date()
    //       },
    //       applicationPlea: 'Please please',
    //       startDate: new Date(),
    //       expiryDate: new Date(),
    //       denialNote: 'Not descriptive enough',
    //       status: ApprovalStatus.REJECTED,
    //       applicantId: 3,
    //       createdAt: new Date()
    //     }
    //   ],
    //   links: {
    //     page: 1,
    //     size: 2,
    //     total: 2
    //   }
    // });
  }

  createApplication(application: InsuranceApplicationRequest) {
    return this.http.post<InsuranceApplication>(`${insuranceApplicationUrl}`, { ...application, applicantId: this.applicantId });
  }

  updateApplication(applicantId: number, application: InsuranceApplicationRequest) {
    return this.http.put<InsuranceApplication>(`${insuranceApplicationUrl}/${applicantId}`, application);
  }

  deleteApplication(applicationId: number) {
    return this.http.delete(`${insuranceApplicationUrl}/${applicationId}`);
  }

  getInsuranceTypes(queryParams: {}) {
    // return of({
    //   data: [
    //     {
    //       id: 1,
    //       name: 'Vehicle',
    //       description: 'Some Description',
    //       amount: 50,
    //       currency: Currency.USD,
    //       isActive: true,
    //       hasExpiryDate: false,
    //       paymentPeriod: PaymentPeriod.MONTHLY,
    //       createdAt: new Date()
    //     }
    //   ],
    //   links: null
    // });
    return this.http.get<PaginatedResponse<InsuranceType>>(`${insuranceUrl}`, { params: this.pageParams(queryParams) });
  }

  private pageParams(query: {}) {
    return new HttpParams({
      fromObject: query
    });
  }
}
