import {Component} from '@angular/core';
import {Order} from '../../models/order';
import {fmtTimestamp} from '../../../shared/constants/formats';
import {DataTests} from '../../../shared/dataTests';
import {EStateOrder} from '../../enum/state-order';

@Component({
  selector: 'app-tela-historico-compra',
  templateUrl: './tela-historico-compra.component.html',
  styleUrls: ['./tela-historico-compra.component.scss']
})
export class TelaHistoricoCompraComponent {

  readonly orders: Order[] = [];
  readonly fmtTimestamp: string = fmtTimestamp;
  readonly eStateOrder = EStateOrder;

  /*TODO: Chamar serviço*/
  constructor() {
    this.orders = [...DataTests.orders];
  }

  aplicarSmileFeliz() {
    const smileElem = document.getElementById('id-smile');

    if (smileElem) {
      smileElem.innerText = ':)';
    }
  }

  aplicarSmileTriste() {
    const smileElem = document.getElementById('id-smile');

    if (smileElem) {
      smileElem.innerText = ':(';
    }
  }
}
