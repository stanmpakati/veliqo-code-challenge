import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Applicant } from '@ui-core/models/user-models';
import { environment } from '@ui-environments/environment';
import { map } from 'rxjs';
import { SSRService } from './ssr.service';
import { isPlatformBrowser } from '@angular/common';

const userUrl = `${environment.AUTH_URL}/user`;
const applicantUrl = `${environment.AUTH_URL}/applicant`;

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(
    private http: HttpClient,
    private ssrService: SSRService
  ) {}

  get getApplicantId() {
    return isPlatformBrowser(this.ssrService.platformId) ? localStorage.getItem('applicant_id') : null;
  }

  getApplicant(userId: number) {
    return this.http.get<Applicant>(`${applicantUrl}/${userId}`).pipe(
      map((applicant) => {
        if (isPlatformBrowser(this.ssrService.platformId)) {
          localStorage.setItem('applicant_id', `${applicant.applicantId}`);
        }
        return applicant;
      })
    );
  }

  updateApplicant(applicantId: number, applicantUpdate: Applicant) {
    return this.http.put<Applicant>(`${applicantUrl}/${applicantId}`, applicantUpdate);
  }
}
