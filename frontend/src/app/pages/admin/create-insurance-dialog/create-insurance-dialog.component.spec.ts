import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateInsuranceDialogComponent } from './create-insurance-dialog.component';

describe('CreateInsuranceDialogComponent', () => {
  let component: CreateInsuranceDialogComponent;
  let fixture: ComponentFixture<CreateInsuranceDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateInsuranceDialogComponent]
    });
    fixture = TestBed.createComponent(CreateInsuranceDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
