import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from './auth.service';
import {Product, ProductAdd} from '../models/product';
import {FilterForSearch, FilterProduct} from '../models/filters/filter-product';
import {httpService} from './generic-http.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private _endpoint = `${environment.apiUrl}/product`;

  constructor(
    private readonly _http: HttpClient,
    private readonly _router: Router
  ) {
  }

  static calculateCostFromArray(productQuantity: [Product, number][]): number {
    return productQuantity
      .map(prodUnits => prodUnits[0].priceWithDiscount * prodUnits[1])
      .reduce((prev, current) => prev + current);
  }

  private static calcRealPrice(price: number, percentOff: number) {
    return price * (100 - percentOff) / 100;
  }

  delete(id: string): Observable<void> {
    return httpService.delete(this._endpoint, id, this._http, AuthService.getHeaders);
  }

  get(filter?: FilterProduct): Observable<Product[]> {
    return httpService.get(this._endpoint, this._http, AuthService.getHeaders, filter);
  }

  getForSearch(filter?: FilterProduct): Observable<FilterForSearch> {
    return httpService.getSingle(`${this._endpoint}/search`, this._http, AuthService.getHeaders, filter);
  }

  getCount(filter?: FilterProduct): Observable<number> {
    return httpService.getSingle(`${this._endpoint}/count`, this._http, AuthService.getHeaders, filter);
  }

  getById(id: string): Observable<Product | undefined> {
    return httpService.getById(this._endpoint, id, this._http, AuthService.getHeaders);
  }

  patch(productId: string, productPatch: object): Observable<Product> {
    return httpService.patch(this._endpoint, productId, this._http, AuthService.getHeaders, productPatch);
  }

  post(product: ProductAdd): Observable<Product> {
    return httpService.post(
      this._endpoint, this._http, AuthService.getHeaders,
      {...product, visible: false}
    );
  }

  toggleVisibility(productId: string, visible: boolean): Observable<void> {
    return httpService.patch(this._endpoint, productId, this._http, AuthService.getHeaders, {visible});
  }
}
