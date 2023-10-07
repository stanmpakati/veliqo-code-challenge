import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogConfig } from '@angular/material/dialog';

export enum DialogAction {
  CONFIRM = 'Confirm',
  DELETE = 'Delete',
  ADD = 'Add',
}

export interface DialogActionData {
  name: string,
  action: DialogAction,
  message: string,
}

@Component({
  selector: 'app-action-confirm',
  templateUrl: './action-confirm.component.html',
  styleUrls: ['./action-confirm.component.scss']
})
export class ActionConfirmComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public actionItem: DialogActionData,
    public dialogRef: MatDialogRef<ActionConfirmComponent>,
  ) { }

  ngOnInit(): void {
    const matDialogConfig = new MatDialogConfig()

    matDialogConfig.position = { top: "4rem" }
    this.dialogRef.updatePosition(matDialogConfig.position)
  }

  actionConfirm() {
    this.dialogRef.close(true)
  }

}
