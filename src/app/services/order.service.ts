import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Order, OrderAdd} from '../models/order';
import {util} from '../../shared/util';
import {AuthService} from './auth.service';
import {FilterBasic} from '../models/filters/filter-basic';
import {ItemOrderAdd} from '../models/item-order';
import {httpService} from './generic-http.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private readonly _routeApi = `${environment.apiUrl}/order`;

  constructor(private readonly _http: HttpClient) {
  }

  static calculateCostItems(items: ItemOrderAdd[]): number {
    return items
      .map(item => item.unitPrice * item.quantity)
      .reduce((prevPrice, currPrice) => prevPrice + currPrice);
  }

  get(filter: FilterBasic): Observable<Order[]> {
    const filterClear = util.clearEmptyFields(filter);
    const params = new HttpParams().set('filter', JSON.stringify(filterClear));
    return httpService.get<Order>(this._routeApi, this._http, AuthService.getHeaders, params);
  }

  post(obj: OrderAdd): Observable<Order> {
    return httpService.post<OrderAdd>(
      this._routeApi, this._http, AuthService.getHeaders, obj
    );
  }

  productPurchased(productId: string, userId: string): Observable<boolean> {
    return httpService.getSingle<boolean>(
      `${this._routeApi}/purchased`, this._http, AuthService.getHeaders,
      new HttpParams()
        .set('productId', productId)
        .set('userId', userId)
    );
  }
}
