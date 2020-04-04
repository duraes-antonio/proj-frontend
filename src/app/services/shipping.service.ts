import {Injectable} from '@angular/core';
import {DeliveryOption} from '../models/deliveryOption';
import {Observable} from 'rxjs';
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
  calculateDeliveryCostDays(
    dimensions: { height: number; width: number; length: number; weight: number }[]
  ): Observable<DeliveryOption> {
    return this._http.post<DeliveryOption>(
      this._endpointUrl,
      dimensions,
      {headers: AuthService.getHeaders()}
    );
  }
}
