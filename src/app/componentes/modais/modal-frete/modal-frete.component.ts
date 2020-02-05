import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Endereco} from '../../../models/Endereco';
import {masks} from '../../../../shared/input-masks/maskFunctions';
import {buildErrorMsg, validation} from '../../../../shared/validations/validationFunctions';

@Component({
  selector: 'app-modal-frete',
  templateUrl: './modal-frete.component.html',
  styleUrls: ['./modal-frete.component.scss']
})
export class ModalFreteComponent implements OnInit {

  @Input() addresses: Endereco[];
  @Output() closed = new EventEmitter();
  @Output() action = new EventEmitter();

  cancelTitle = 'Cancelar';
  confirmTitle = 'Calcular';
  modalTitle = 'Digite seu CEP ou selecione um de seus endereços';
  modalDesc = 'Abaixo será possível conferir os prazos e custos de entrega desse produto.';

  inputCEP = '';
  validCEP = false;
  textHintCEP = 'Exemplo de CEP: 29161688';

  constructor() {
  }

  ngOnInit() {
  }

  selectAddress(id: number, className: string) {
    const items = document.getElementsByClassName(className);

    /*Remova a classe que realça o endereço selecionado atualmente*/
    if (items.length) {
      items[0].classList.remove(className);
    }

    /*Adicione a classe ao novo endereço selecionado*/
    document.getElementById(id.toString()).classList.add(className);

    const input = document.getElementById('input-cep') as HTMLInputElement;
    input.labels.forEach(l => l.classList.add('active'));
    this.inputCEP = this.addresses.find(a => a.id === id).cep;
    this.validateCEP(this.inputCEP, this.textHintCEP, 'hint-cep', 'input-cep');
  }

  formatCEP(e): void {
    e.target.value = masks.cep(e.target.value);
    this.inputCEP = e.target.value;
  }

  validateCEP(cep: string, textHint: string, idHintElem: string, idInput: string): void {
    let textError;

    /*Verifique se o CEP atual é válido*/
    /*Se não for, gere uma mensagem com o erro adequado*/
    if (!validation.notNullOrEmpty(cep)) {
      textError = buildErrorMsg.msgNullOrEmpty('CEP');
    } else if (!validation.exactlytLen(cep.replace('-', ''), 8)) {
      textError = buildErrorMsg.msgExactlyLen('CEP', 8);
    }

    this.validCEP = !textError;
    const hintElem = document.getElementById(idHintElem);
    const inputElem = document.getElementById(idInput);

    /*Marque o input com uma classe de erro*/
    hintElem.innerText = textError ? textError : textHint;
    textError ? hintElem.classList.add('invalid') : hintElem.classList.remove('invalid');
    textError ? inputElem.classList.add('invalid') : inputElem.classList.remove('invalid');
  }

  clearRadioAdress(nameElemRadio: string, activeAddressClass: string) {
    document.getElementsByName(nameElemRadio)
      .forEach((radio: HTMLInputElement) => radio.checked = false);
    document.getElementsByClassName(activeAddressClass)[0].classList.remove(activeAddressClass);
  }

  emitEvent(emitter: EventEmitter<any>, value?: any): void {
    emitter.emit(value);
  }
}
