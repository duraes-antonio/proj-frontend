import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DeliveryOption} from '../../../models/DeliveryOption';
import {Endereco} from '../../../models/Endereco';

@Component({
  selector: 'app-modal-shipping',
  templateUrl: './modal-shipping.component.html',
  styleUrls: ['./modal-shipping.component.scss']
})
export class ModalShippingComponent implements OnInit {
  modalTitle = 'Como deseja receber seus produtos?';
  confirmTitle = 'Selecionar';
  cancelTitle = 'Cancelar';
  optSelected: DeliveryOption;

  @Input() optionsDelivery: DeliveryOption[];
  @Input() address: Endereco;
  @Output() closed = new EventEmitter();
  @Output() action = new EventEmitter();
  @Output() selectAddress = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

  selectOptDelivery(opt: DeliveryOption, id: number, className: string) {
    this.optSelected = opt;
    const items = document.getElementsByClassName(className);

    /*Remova a classe que realça o endereço selecionado atualmente*/
    if (items.length) {
      items[0].classList.remove(className);
    }

    /*Adicione a classe ao novo endereço selecionado*/
    document.getElementById(`option-${id}`).classList.add(className);
    (document.getElementById(`input-${id}`) as HTMLInputElement).checked = true;
  }

  emitEvent(emitter: EventEmitter<any>, value?: any): void {
    emitter.emit(value);
  }
}
