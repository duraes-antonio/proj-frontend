import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {HttpClient, HttpParams} from '@angular/common/http';
import {AuthService} from './auth.service';
import {DeliveryOption, ItemShipping} from '../models/shipping/delivery';
import {take} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ShippingService {

  private _endpointUrl = `${environment.apiUrl}/shipping`;

  constructor(private readonly _http: HttpClient) {
  }

  calculateCostDays(zipcodeTarget: string, items: ItemShipping[]): Observable<DeliveryOption[]> {
    return this._http.get<DeliveryOption[]>(
      this._endpointUrl,
      {
        headers: AuthService.getHeaders(),
        params: new HttpParams()
          .set('zipcodeOrigin', '29161699')
          .set('zipcodeTarget', zipcodeTarget)
          .set('itemsOrder', JSON.stringify(items))
      }
    ).pipe(take(1));
  }
}
