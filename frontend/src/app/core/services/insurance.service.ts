import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  ApprovalStatus,
  Currency,
  InsuranceApplication,
  InsuranceApplicationRequest,
  InsuranceApplicationUpdate,
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
  }

  getApplication(applicationId: number) {
    return this.http.get<InsuranceApplication>(`${insuranceApplicationUrl}/${applicationId}`);
  }

  createApplication(application: InsuranceApplicationRequest) {
    return this.http.post<InsuranceApplication>(`${insuranceApplicationUrl}`, { ...application, applicantId: this.applicantId });
  }

  updateApplication(applicantId: number, application: InsuranceApplicationUpdate) {
    return this.http.put<InsuranceApplication>(`${insuranceApplicationUrl}/${applicantId}`, application);
  }

  deleteApplication(applicationId: number) {
    return this.http.delete(`${insuranceApplicationUrl}/${applicationId}`);
  }

  getInsuranceTypes(queryParams: {}) {
    return this.http.get<PaginatedResponse<InsuranceType>>(`${insuranceUrl}`, { params: this.pageParams(queryParams) });
  }

  createInsurance(createInsuranceDto: any) {
    return this.http.post<InsuranceType>(`${insuranceUrl}`, createInsuranceDto);
  }

  updateInsuranceType(id: number, createinsuranceDto: any) {
    return this.http.put<InsuranceType>(`${insuranceUrl}/${id}`, createinsuranceDto);
  }

  deleteInsuranceType(id: number) {
    return this.http.delete(`${insuranceUrl}/${id}`);
  }

  private pageParams(query: {}) {
    return new HttpParams({
      fromObject: query
    });
  }
}
