import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsuranceTypesComponent } from './insurance-types.component';

describe('InsuranceTypesComponent', () => {
  let component: InsuranceTypesComponent;
  let fixture: ComponentFixture<InsuranceTypesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InsuranceTypesComponent]
    });
    fixture = TestBed.createComponent(InsuranceTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
