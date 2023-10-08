import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminApplicationsComponent } from './admin-applications.component';

describe('AdminApplicationsComponent', () => {
  let component: AdminApplicationsComponent;
  let fixture: ComponentFixture<AdminApplicationsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminApplicationsComponent]
    });
    fixture = TestBed.createComponent(AdminApplicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
