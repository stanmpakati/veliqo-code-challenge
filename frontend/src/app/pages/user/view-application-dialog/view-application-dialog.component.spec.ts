import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewApplicationDialogComponent } from './view-application-dialog.component';

describe('ViewApplicationDialogComponent', () => {
  let component: ViewApplicationDialogComponent;
  let fixture: ComponentFixture<ViewApplicationDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewApplicationDialogComponent]
    });
    fixture = TestBed.createComponent(ViewApplicationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
