'use strict';
import {Component, EventEmitter, Inject, Output} from '@angular/core';
import {DeliveryOption} from '../../../models/deliveryOption';
import {MAT_DIALOG_DATA, MatDialogConfig} from '@angular/material/dialog';

@Component({
  selector: 'app-modal-shipping-mat',
  templateUrl: './modal-shipping-mat.component.html',
  styleUrls: ['./modal-shipping-mat.component.scss']
})
export class ModalShippingMatComponent {
  modalTitle = 'Como deseja receber seus produtos?';
  confirmTitle = 'Selecionar';
  cancelTitle = 'Cancelar';
  optSelected?: DeliveryOption;

  @Output() closed = new EventEmitter();
  @Output() action = new EventEmitter();
  @Output() selectAddress = new EventEmitter();

  constructor(@Inject(MAT_DIALOG_DATA) public data: IModalShippingData) {
  }

  static getConfig(data: IModalShippingData): MatDialogConfig {
    return {
      data: data,
      maxHeight: '100vh',
      maxWidth: '650px',
      minWidth: '600px',
    };
  }

  selectOptDelivery(opt: DeliveryOption, id: number, className: string) {
    this.optSelected = opt;
    const items = document.getElementsByClassName(className);

    /*Remova a classe que realça o endereço selecionado atualmente*/
    if (items.length) {
      items[0].classList.remove(className);
    }

    /*Adicione a classe ao novo endereço selecionado*/
    const optSelected = document.getElementById(`option-${id}`);

    if (optSelected) {
      optSelected.classList.add(className);
    }
  }
}

export interface IModalShippingData {
  optionsDelivery: DeliveryOption[];
}
