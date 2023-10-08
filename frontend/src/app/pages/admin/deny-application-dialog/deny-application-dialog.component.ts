import { Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogConfig } from '@angular/material/dialog';
import { InsuranceApplication } from '@ui-core/models/insurance-models';
import { DialogActionData, ActionConfirmComponent } from 'src/app/theme/shared/components/action-confirm/action-confirm.component';

@Component({
  selector: 'app-deny-application-dialog',
  templateUrl: './deny-application-dialog.component.html',
  styleUrls: ['./deny-application-dialog.component.scss']
})
export class DenyApplicationDialogComponent {
  denialNoteControl: FormControl;

  constructor(
    @Inject(MAT_DIALOG_DATA) public application: InsuranceApplication,
    public dialogRef: MatDialogRef<DenyApplicationDialogComponent>
  ) {}

  ngOnInit(): void {
    this.denialNoteControl = new FormControl(this.application?.denialNote, { validators: Validators.required });
  }

  actionConfirm() {
    this.dialogRef.close({ isSuccessful: true, data: this.denialNoteControl.value });
  }
}
