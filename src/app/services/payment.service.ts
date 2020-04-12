import {Injectable} from '@angular/core';
import {Order} from '../models/order';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor() {
  }

  payItemsPaypal(order: Order) {
    /*TODO:
       - Adicionar items a uma cesta;
       - Calcular preço de cada item;
       - Calcular preço de entrega de cada item;
       - Total (custo de entrega + custo de itens)
       */
  }
}
