'use strict';
import {Component, EventEmitter, Output} from '@angular/core';
import {MatDialogConfig} from '@angular/material/dialog';

@Component({
  selector: 'app-modal-payment-mat',
  templateUrl: './modal-payment-mat.component.html',
  styleUrls: ['./modal-payment-mat.component.scss']
})
export class ModalPaymentMatComponent {
  @Output() closed = new EventEmitter();

  readonly text = {
    title: 'Formas de pagamento',
    btnCancel: 'OK'
  };

  static getConfig(): MatDialogConfig {
    return {
      maxHeight: '100vh',
      maxWidth: '650px',
      minWidth: '600px',
    };
  }
}
