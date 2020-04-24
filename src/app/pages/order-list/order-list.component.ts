import {Component} from '@angular/core';
import {Order} from '../../models/order';
import {fmtTimestamp} from '../../../shared/constants/formats';
import {EStateOrder} from '../../enum/state-order';
import {OrderService} from '../../services/order.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent {

  readonly orders$: Observable<Order[]>;
  readonly fmtTimestamp: string = fmtTimestamp;
  readonly states = EStateOrder;

  constructor(
    private readonly _orderServ: OrderService
  ) {
    this.orders$ = _orderServ.get({perPage: 10, currentPage: 1});
  }

  // TODO: Recriar tela p/ quando não houver compras ou impedir acesso
  applyHappySmile() {
    const smileElem = document.getElementById('id-smile');

    if (smileElem) {
      smileElem.innerText = ':)';
    }
  }

  applySadSmile() {
    const smileElem = document.getElementById('id-smile');

    if (smileElem) {
      smileElem.innerText = ':(';
    }
  }
}
