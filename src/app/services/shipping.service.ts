import {Injectable} from '@angular/core';
import {DeliveryOption} from '../models/deliveryOption';
import {Observable, of} from 'rxjs';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ShippingService {

  private _endpointUrl = `${environment.apiUrl}/shipping`;

  constructor(private _http: HttpClient) {
  }

  /*TODO: Chamar serviço do backend quando estiver pronto*/
  calculateCostDays(cep: string, items: { quantity: number, productId: string }[]): Observable<DeliveryOption> {
    const cost = items
      .map(item => item.quantity * Math.random() * 100)
      .reduce((p, c) => p + c);
    return of({cost: cost, timeDays: 7} as DeliveryOption);
    return this._http.post<DeliveryOption>(
      this._endpointUrl,
      {items, cep},
      {headers: AuthService.getHeaders()}
    );
  }
}
