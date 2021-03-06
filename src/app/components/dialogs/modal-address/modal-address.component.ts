'use strict';
import {Component, EventEmitter, Inject, Output} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogConfig} from '@angular/material/dialog';
import {FormControl} from '@angular/forms';
import {Address} from '../../../models/address';
import {masks} from '../../../../shared/input-masks/maskFunctions';
import {validators} from '../../../../shared/validations/validatorsCustom';
import {getMsgFront} from '../../../../shared/validations/msgErrorFunctionsFront';

@Component({
  selector: 'app-modal-frete-mat',
  templateUrl: './modal-address.component.html',
  styleUrls: ['./modal-address.component.scss']
})
export class ModalAddressComponent {
  @Output() closed = new EventEmitter();
  @Output() action = new EventEmitter<string>();
  @Output() chosenAddress = new EventEmitter<Address>();

  controlCep = new FormControl('', [validators.cepValidator()]);
  textHintCEP = 'Exemplo de CEP: 29161688';
  addressChosenId = '';

  readonly getMsg = getMsgFront;
  private readonly _text = {
    cancelTitle: 'Cancelar',
    confirmTitle: 'Calcular',
    confirmTitleOnlyAddress: 'Selecionar',
    modalTitle: 'Digite seu CEP ou selecione um de seus endereços',
    modalTitleOnlyAddress: 'Selecione um de seus endereços',
    modalDesc: 'Abaixo será possível conferir os prazos e custos de entrega desse produto.',
    modalDescOnlyAddress: 'Após escolher, será possível conferir os prazos e custos de entrega.'
  };
  readonly title = this.data.showInputCEP ? this._text.modalTitle : this._text.modalTitleOnlyAddress;
  readonly desc = this.data.showInputCEP ? this._text.modalDesc : this._text.modalDescOnlyAddress;
  readonly btnCancelTitle = this._text.cancelTitle;
  readonly btnActionTitle = this.data.showInputCEP ? this._text.confirmTitle : this._text.confirmTitleOnlyAddress;

  constructor(@Inject(MAT_DIALOG_DATA) public data: IModalAddressData) {
  }

  static getConfig(data: IModalAddressData): MatDialogConfig {
    return {
      data: data,
      maxHeight: '100vh',
      maxWidth: '650px',
    };
  }

  selectAddress(id: string, className: string) {
    this.addressChosenId = id;

    const items = document.getElementsByClassName(className);
    /*Remova a classe que realça o endereço selecionado atualmente*/
    if (items.length) {
      items[0].classList.remove(className);
    }

    /*Adicione a classe ao novo endereço selecionado*/
    const addressSelected = document.getElementById(id);

    if (addressSelected) {
      addressSelected.classList.add(className);
    }

    this.chosenAddress.emit(this.data.addresses.find(a => a.id === id));

    if (this.data.showInputCEP) {
      const address = this.data.addresses.find(a => a.id === id);

      if (address) {
        this.controlCep.setValue(address.zipCode);
      }
    }
  }

  formatCEP(eTarget: any): void {
    eTarget.value = masks.cep(eTarget.value);
  }

  clearRadioAdress(activeAddressClass: string) {
    this.addressChosenId = '';
    const activeRadios = document.getElementsByClassName(activeAddressClass);

    if (activeRadios.length > 0) {
      activeRadios[0].classList.remove(activeAddressClass);
    }
  }
}

export interface IModalAddressData {
  addresses: Address[];
  showInputCEP: boolean;
}
