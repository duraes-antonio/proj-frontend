import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-modal-payment',
  templateUrl: './modal-payment.component.html',
  styleUrls: ['./modal-payment.component.scss']
})
export class ModalPaymentComponent implements OnInit {

  @Output() action = new EventEmitter();
  @Output() closed = new EventEmitter();
  modalText = {
    title: 'Formas de pagamento',
    desc: 'Aceitamos todas as formas de pagamento listadas abaixo',
    btnCancel: 'OK'
  };

  constructor() {
  }

  ngOnInit(): void {
  }
}
