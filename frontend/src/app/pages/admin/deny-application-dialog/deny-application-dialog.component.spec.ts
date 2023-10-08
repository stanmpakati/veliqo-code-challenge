import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DenyApplicationDialogComponent } from './deny-application-dialog.component';

describe('DenyApplicationDialogComponent', () => {
  let component: DenyApplicationDialogComponent;
  let fixture: ComponentFixture<DenyApplicationDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DenyApplicationDialogComponent]
    });
    fixture = TestBed.createComponent(DenyApplicationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
