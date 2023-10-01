import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Applicant } from '@ui-core/models/user-models';
import { environment } from '@ui-environments/environment';

const userUrl = `${environment.AUTH_URL}/user`;
const applicantUrl = `${environment.AUTH_URL}/applicant`;

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {}

  getApplicant(applicantId: number) {
    return this.http.get<Applicant>(`${applicantUrl}/${applicantId}`);
  }

  updateApplicant(applicantId: number, applicantUpdate: Applicant) {
    return this.http.post<Applicant>(`${applicantUrl}/${applicantId}`, applicantUpdate);
  }
}
