import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {FilterBasic} from '../models/filters/filter-base';
import {Order, OrderAdd} from '../models/order';
import {DataTests} from '../../shared/dataTests';
import {util} from '../../shared/util';
import {AuthService} from './auth.service';
import {take} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private readonly _routeApi = `${environment.apiUrl}/order`;

  constructor(
    private readonly _http: HttpClient,
  ) {
  }

  /*TODO: Adicionar filtro*/
  get(filter: FilterBasic): Observable<Order[]> {
    return of(DataTests.orders);
    const clearFilter = util.primitiveFieldsToString(util.clearEmptyFields(filter));
    return this._http.get<Order[]>(
      this._routeApi,
      {headers: AuthService.getHeaders(), params: clearFilter}
    ).pipe(take(1));
  }

  /*TODO: Adicionar filtro*/
  productPurchased(productId: string, userId: string): Observable<boolean> {
    return of(true);
    const params = new HttpParams()
      .set('productId', productId)
      .set('userId', userId);
    return this._http.get<boolean>(
      `${this._routeApi}/purchased`,
      {headers: AuthService.getHeaders(), params: params}
    ).pipe(take(1));
  }

  post(obj: OrderAdd): Observable<Order> {
    return this._http.post<Order>(
      this._routeApi,
      obj,
      {headers: AuthService.getHeaders()}
    ).pipe(take(1));
  }
}