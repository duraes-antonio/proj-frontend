import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {HttpClient, HttpParams} from '@angular/common/http';
import {AuthService} from './auth.service';
import {DeliveryOption, ItemShipping} from '../models/shipping/delivery';
import {httpService} from './generic-http.service';

@Injectable({
  providedIn: 'root'
})
export class ShippingService {

  private _endpoint = `${environment.apiUrl}/shipping`;

  constructor(private readonly _http: HttpClient) {
  }

  calculateCostDays(zipcodeTarget: string, items: ItemShipping[]): Observable<DeliveryOption[]> {
    return httpService.get(
      this._endpoint, this._http, AuthService.getHeaders,
      new HttpParams()
        .set('zipcodeOrigin', '29161699')
        .set('zipcodeTarget', zipcodeTarget)
        .set('itemsOrder', JSON.stringify(items))
    );
  }
}
