'use strict';
import {Component, EventEmitter, Inject, Output} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogConfig} from '@angular/material/dialog';
import {FormControl, ValidatorFn} from '@angular/forms';
import {Endereco} from '../../../models/Endereco';
import {masks} from '../../../../shared/input-masks/maskFunctions';
import {validation} from '../../../../shared/validations/validationFunctions';
import {EErrorType, getMsg} from '../../../../shared/validations/msgErrorFunctions';

@Component({
  selector: 'app-modal-frete-mat',
  templateUrl: './modal-address.component.html',
  styleUrls: ['./modal-address.component.scss']
})
export class ModalAddressComponent {
  @Output() closed = new EventEmitter();
  @Output() action = new EventEmitter<string>();
  @Output() chosenAddress = new EventEmitter<Endereco>();

  controlCep = new FormControl('', [this.cepValidator()]);
  textHintCEP = 'Exemplo de CEP: 29161688';
  addressChosenId = 0;

  readonly getMsg = getMsg;
  private readonly text = {
    cancelTitle: 'Cancelar',
    confirmTitle: 'Calcular',
    confirmTitleOnlyAddress: 'Selecionar',
    modalTitle: 'Digite seu CEP ou selecione um de seus endereços',
    modalTitleOnlyAddress: 'Selecione um de seus endereços',
    modalDesc: 'Abaixo será possível conferir os prazos e custos de entrega desse produto.',
    modalDescOnlyAddress: 'Após escolher, será possível conferir os prazos e custos de entrega.'
  };
  readonly title = this.data.showInputCEP ? this.text.modalTitle : this.text.modalTitleOnlyAddress;
  readonly desc = this.data.showInputCEP ? this.text.modalDesc : this.text.modalDescOnlyAddress;
  readonly btnCancelTitle = this.text.cancelTitle;
  readonly btnActionTitle = this.data.showInputCEP ? this.text.confirmTitle : this.text.confirmTitleOnlyAddress;

  constructor(@Inject(MAT_DIALOG_DATA) public data: IModalAddressData) {
  }

  static getConfig(data: IModalAddressData): MatDialogConfig<any> {
    return {
      data: data,
      maxHeight: '100vh',
      maxWidth: '650px',
    };
  }

  selectAddress(id: number, className: string) {
    const items = document.getElementsByClassName(className);

    /*Remova a classe que realça o endereço selecionado atualmente*/
    if (items.length) {
      items[0].classList.remove(className);
    }

    /*Adicione a classe ao novo endereço selecionado*/
    document.getElementById(id.toString()).classList.add(className);

    this.chosenAddress.emit(this.data.addresses.find(a => a.id === id));

    if (this.data.showInputCEP) {
      this.controlCep.setValue(this.data.addresses.find(a => a.id === id).cep);
    }
  }

  formatCEP(e): void {
    e.target.value = masks.cep(e.target.value);
  }

  cepValidator(): ValidatorFn {
    return (control: FormControl): { [key: string]: any } | null => {
      const cep = masks.cep(control.value);

      if (!validation.hasValue(cep)) {
        return {[EErrorType.REQUIRED]: true};
      } else if (!validation.validCEP(cep.replace('-', ''))) {
        return {[EErrorType.FORMAT]: true};
      }

      return null;
    };
  }

  clearRadioAdress(activeAddressClass: string) {
    this.addressChosenId = null;
    const activeRadios = document.getElementsByClassName(activeAddressClass);

    if (activeRadios.length > 0) {
      activeRadios[0].classList.remove(activeAddressClass);
    }
  }
}

export interface IModalAddressData {
  addresses: Endereco[];
  showInputCEP: boolean;
}
