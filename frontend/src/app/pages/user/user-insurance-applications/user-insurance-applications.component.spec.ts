import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserInsuranceApplicationsComponent } from './user-insurance-applications.component';

describe('UserInsuranceApplicationsComponent', () => {
  let component: UserInsuranceApplicationsComponent;
  let fixture: ComponentFixture<UserInsuranceApplicationsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserInsuranceApplicationsComponent]
    });
    fixture = TestBed.createComponent(UserInsuranceApplicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
