import { Location, LocationStrategy } from '@angular/common';
import { Component, NgZone } from '@angular/core';
import { Applicant, MaritalStatus, UserSex } from '@ui-core/models/user-models';
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
    private zone: NgZone,
    private location: Location,
    private locationStrategy: LocationStrategy
  ) {
    this.berryConfig = BerryConfig;

    let current_url = this.location.path();
    const baseHref = this.locationStrategy.getBaseHref();
    if (baseHref) {
      current_url = baseHref + this.location.path();
    }

    if (current_url === baseHref + '/layout/theme-compact' || current_url === baseHref + '/layout/box') {
      this.berryConfig.isCollapse_menu = true;
    }

    this.windowWidth = window.innerWidth;
    this.navCollapsed = this.windowWidth >= 1025 ? BerryConfig.isCollapse_menu : false;
  }

  // public method
  navMobClick() {
    if (this.navCollapsedMob && !document.querySelector('app-navigation.coded-navbar')?.classList.contains('mob-open')) {
      this.navCollapsedMob = !this.navCollapsedMob;
      setTimeout(() => {
        this.navCollapsedMob = !this.navCollapsedMob;
      }, 100);
    } else {
      this.navCollapsedMob = !this.navCollapsedMob;
    }
  }
}
