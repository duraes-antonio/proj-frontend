'use strict';
import {ChangeDetectionStrategy, Component, EventEmitter, Inject, Output} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogConfig} from '@angular/material/dialog';
import {DeliveryOption, ItemShipping} from '../../../models/shipping/delivery';
import {util} from '../../../../shared/util';
import {AddressAdd} from '../../../models/address';
import {AddressService} from '../../../services/address.service';
import {Observable} from 'rxjs';
import {ShippingService} from '../../../services/shipping.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-modal-shipping-mat',
  templateUrl: './modal-shipping-mat.component.html',
  styleUrls: ['./modal-shipping-mat.component.scss']
})
export class ModalShippingMatComponent {
  readonly modalTitle = 'Como deseja receber seus produtos?';
  readonly confirmTitle = 'Selecionar';
  readonly cancelTitle = 'Cancelar';
  readonly util = util;
  readonly optionsDelivery$: Observable<DeliveryOption[]>;
  optSelected?: DeliveryOption;
  address?: AddressAdd;

  @Output() closed = new EventEmitter();
  @Output() action = new EventEmitter();
  @Output() selectAddress = new EventEmitter();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: IModalShippingData,
    private readonly _addressServ: AddressService,
    private readonly _shippingServ: ShippingService,
  ) {
    this.optionsDelivery$ = _shippingServ.calculateCostDays(data.zipcode, data.items);
    _addressServ.getFromViaCEP(data.zipcode)
      .subscribe((a: AddressAdd) => this.address = a);
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
  zipcode: string;
  items: ItemShipping[];
}
