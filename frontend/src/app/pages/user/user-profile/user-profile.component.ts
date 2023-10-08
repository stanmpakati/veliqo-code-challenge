import { UserService } from '@ui-core/services/user.service';
import { Location, LocationStrategy } from '@angular/common';
import { Component, NgZone } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Applicant, MaritalStatus, User, UserSex } from '@ui-core/models/user-models';
import { BerryConfig } from 'src/app/app-config';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent {
  berryConfig;
  navCollapsed: boolean;
  navCollapsedMob = false;
  windowWidth: number;
  applicantId: number;
  isLoading = false;

  applicant: Applicant = {
    applicantId: 1,
    dob: new Date(),
    maritalStatus: MaritalStatus.SINGLE,
    mobileNumber: '09112232',
    nationality: 'ZIMBABWEAN',
    occupation: 'Software dev',
    sex: UserSex.MALE,
    numberOfDependents: 0,
    address: {
      street: '1-20 Ave',
      suburb: 'Mabelreign',
      city: 'Harare',
      country: 'Zimbabwe'
    },
    user: {
      id: 1,
      email: 'stan@gani.com',
      firstName: 'Stan',
      lastName: 'Mpakati',
      middleNames: 'Gani'
    }
  };

  // Constructor
  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) {
    this.route.params.subscribe((params) => {
      console.log({ params });

      if (params['applicantId'] == null) {
        this.applicantId = this.userService.getApplicantId;
      } else {
        this.applicantId = params['applicantId'];
      }

      this.loadData();
    });
  }

  private loadData() {
    this.isLoading = true;

    this.userService.getApplicant(this.applicantId).subscribe({
      next: (data) => {
        console.log('res', data);
        this.applicant = data;
      },
      error: () => {
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }
}
