import {ElementRef, Injectable} from '@angular/core';
import {OrderAdd} from '../models/order';
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

  initScriptPaypal(
    paypalObj: any, order: OrderAdd, fnCreateOrder: (order: OrderAdd) => Promise<string>,
    fnCheckOnClick: () => boolean, elRefDiv: ElementRef, fnCheckFail?: () => any,
    fnCheckSuccess?: () => any, fnAfterOnApprove?: () => any
  ) {
    /* Documentação com métodos e atributos:
     https://developer.paypal.com/docs/checkout/integration-features/validation/#asynchronous-validation
     */
    paypalObj
      .Buttons({
        onClick: (data: any, actions: any) => {
          if (fnCheckOnClick()) {
            if (fnCheckSuccess) {
              fnCheckSuccess();
            }
            return actions.resolve();
          } else {
            if (fnCheckFail) {
              fnCheckFail();
            }
            return actions.reject();
          }
        },
        createOrder: async (data: any, actions: any) => {
          return await fnCreateOrder(order);
        },
        onApprove: async (data: any, actions: any) => {
          await actions.order.capture();
          if (fnAfterOnApprove) {
            fnAfterOnApprove();
          }
        },
        // TODO: Ver forma de exibir o erro
        onError: (err: Error) => {
          console.log(err);
        }
      })
      .render(elRefDiv);
  }

  payWithPaypal(order: OrderAdd): Observable<string> {
    return httpService.post(`${this._endpoint}/paypal`, this._http, AuthService.getHeaders, order)
      .pipe(map((res: { data: string }) => res.data));
  }

  payWithPagSeguro(order: OrderAdd): Observable<string> {
    return httpService.post(`${this._endpoint}/pag-seguro`, this._http, AuthService.getHeaders, order)
      .pipe(map((res: { data: string }) => res.data));
  }
}
