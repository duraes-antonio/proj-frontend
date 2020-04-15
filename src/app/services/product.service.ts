import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable, of} from 'rxjs';
import {AuthService} from './auth.service';
import {Product, ProductAdd} from '../models/product';
import {FilterProductBackend} from '../models/filters/filter-product-user';
import {DataTests} from '../../shared/dataTests';
import {util} from '../../shared/util';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private readonly _http: HttpClient,
    private readonly _router: Router
  ) {
  }

  private _routeApi = `${environment.apiUrl}/address`;

  static calculateCostFromArray(productQuantity: [Product, number][]): number {
    return productQuantity
      .map(prodUnits => prodUnits[0].priceWithDiscount * prodUnits[1])
      .reduce((prev, current) => prev + current);
  }

  delete(id: string): Observable<Product> {
    return this._http.delete<Product>(
      `${this._routeApi}/${id}`,
      {headers: AuthService.getHeaders()}
    );
  }

  /*TODO: Subsituir dados mockados por consulta*/
  get(filter?: FilterProductBackend): Observable<Product[]> {
    const params = filter
      ? new HttpParams({
        fromObject: util.primitiveFieldsToString(util.clearEmptyFields(filter))
      })
      : {};
    return of(DataTests.products
      .filter(p => !filter || filter?.ids?.includes(p.id))
    );
    return this._http.get<Product[]>(
      this._routeApi, {headers: AuthService.getHeaders(), params}
    );
  }

  /*TODO: Subsituir dados mockados por consulta*/
  getById(id: string): Observable<Product | undefined> {
    debugger
    return of(DataTests.products.find(p => p.id === id));
    return this._http.get<Product>(
      `${this._routeApi}/${id}`,
      {headers: AuthService.getHeaders()}
    );
  }

  patch(obj: object): Observable<void> {
    return this._http.patch<void>(
      this._routeApi,
      obj,
      {headers: AuthService.getHeaders()}
    );
  }

  post(obj: ProductAdd): Observable<Product> {
    return this._http.post<Product>(
      this._routeApi,
      obj,
      {headers: AuthService.getHeaders()}
    );
  }

  toggleVisibility(productId: string): Observable<void> {
    return this._http.post<void>(
      `${this._routeApi}/hide/${productId}`,
      {headers: AuthService.getHeaders()}
    );
  }
}
