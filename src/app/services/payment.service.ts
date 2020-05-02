import {Injectable} from '@angular/core';
import {Order, OrderAdd} from '../models/order';
import {HttpClient} from '@angular/common/http';
import {httpService} from './generic-http.service';
import {Observable} from 'rxjs';
import {AuthService} from './auth.service';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private readonly _endpoint = `${environment.apiUrl}/payment`;

  constructor(private readonly _http: HttpClient) {
  }

  payWithPaypal(order: Order) {
    /*TODO:
       - Adicionar items a uma cesta;
       - Calcular preço de cada item;
       - Calcular preço de entrega de cada item;
       - Total (custo de entrega + custo de itens)
       */
    return httpService.post(
      `${this._endpoint}/paypal`,
      this._http,
      AuthService.getHeaders,
      order
    ).pipe(
      map((res: { data: string }) => res.data),
    );
  }

  payWithMercadoPago(): Observable<string> {
    return httpService.post(
      `${this._endpoint}/mercado-pago`,
      this._http,
      AuthService.getHeaders,
      {}
    ).pipe(
      map((res: { data: string }) => res.data),
    );
  }

  payWithPagSeguro(order: OrderAdd): Observable<string> {
    return httpService.post(
      `${this._endpoint}/pag-seguro`,
      this._http,
      AuthService.getHeaders,
      order
    ).pipe(
      map((res: { data: string }) => res.data),
    );
  }
}
