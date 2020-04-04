import {Injectable} from '@angular/core';
import {Order} from '../models/order';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private _ppMode = 'sandbox';
  private _ppSandboxAcc = 'sb-1guzs1303671@business.example.com';
  private _ppToken = 'access_token$sandbox$hj8cqm69twn66kkz$6d5682a1fe62837ab5987ff2a1403b5b';
  private _ppClientId = 'AXg0OUZI4L1NOOWjPyQM-WRBA-gmkNJU4dn0ZZKDbgZ08UF-DaqIQbv0afTG5NrrEW15GmAx94nXuqeo';
  private _ppSecret = 'EHc8BkuG7LR92TxIshn6lE4I6aPa0axwYp5f1M3QFImlnMHN6pQwPd-qj64mZvUSU4UBma_AzRHLBQuv';

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
