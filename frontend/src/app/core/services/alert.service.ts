import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }

  showSuccess(message?: string, title = 'Success') {
    alert(message)
  }

  showError(message?: string, title = 'Error') {
    alert(message)
  }

  showInfo(message: string, title: string) {
    alert(message)
  }

  showWarning(message: string, title: string) {
    alert(message)
  }
}
