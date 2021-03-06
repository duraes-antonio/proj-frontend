import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Order, OrderAdd, OrderFilterFilled} from '../models/order';
import {AuthService} from './auth.service';
import {FilterBasic} from '../models/filters/filter-basic';
import {ItemOrderAdd} from '../models/item-order';
import {httpService} from './generic-http.service';
import {map} from 'rxjs/operators';
import {FilterOrder} from '../models/filters/filter-order';

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
    return httpService.get<Order>(this._routeApi, this._http, AuthService.getHeaders, filter);
  }

  getById(id: string): Observable<Order> {
    return httpService.getById<Order>(this._routeApi, id, this._http, AuthService.getHeaders);
  }

  post(obj: OrderAdd): Observable<Order> {
    return httpService.post(this._routeApi, this._http, AuthService.getHeaders, obj);
  }

  productPurchased(productId: string, userId: string): Observable<boolean> {
    return httpService.getSingle<{ data: boolean }>(
      `${this._routeApi}/purchased`, this._http, AuthService.getHeaders,
      new HttpParams()
        .set('productId', productId)
        .set('userId', userId)
    ).pipe(map(res => res.data));
  }

  search(filter?: FilterOrder): Observable<OrderFilterFilled> {
    return httpService.getSingle(`${this._routeApi}/search`, this._http, AuthService.getHeaders, filter);
  }
}
