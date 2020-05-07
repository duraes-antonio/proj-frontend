import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from './auth.service';
import {Product, ProductAdd} from '../models/product';
import {util} from '../../shared/util';
import {FilterProduct} from '../models/filters/filter-product';
import {map, take} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private _routeApi = `${environment.apiUrl}/product`;

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

  delete(id: string): Observable<Product> {
    return this._http.delete<Product>(
      `${this._routeApi}/${id}`,
      {headers: AuthService.getHeaders()}
    ).pipe(take(1));
  }

  get(filter?: FilterProduct): Observable<Product[]> {
    let params = new HttpParams();

    if (filter) {
      const filterStringParsed = util.clearEmptyFields(filter);
      params = new HttpParams().set('filter', JSON.stringify(filterStringParsed));
    }
    return this._http.get<Product[]>(
      this._routeApi,
      {headers: AuthService.getHeaders(), params}
    ).pipe(
      map((products: Product[]) => products
        .map(p => {
          return {...p, priceWithDiscount: ProductService.calcRealPrice(p.price, p.percentOff)};
        })
      ),
      take(1)
    );
  }

  getCount(filter?: FilterProduct): Observable<number> {
    const filterStringParsed = JSON.stringify(util.clearEmptyFields(filter));
    const params = filter
      ? new HttpParams({fromString: filterStringParsed})
      : {};
    return this._http.get<{ data: number }>(
      `${this._routeApi}/count`,
      {headers: AuthService.getHeaders(), params}
    ).pipe(
      map((res: { data: number }) => res.data),
      take(1)
    );
  }

  getById(id: string): Observable<Product | undefined> {
    return this._http.get<Product>(
      `${this._routeApi}/${id}`,
      {headers: AuthService.getHeaders()}
    ).pipe(
      map((p: Product) => {
        return {...p, priceWithDiscount: ProductService.calcRealPrice(p.price, p.percentOff)};
      }),
      take(1)
    );
  }

  patch(id: string, obj: object): Observable<Product> {
    return this._http.patch<Product>(
      `${this._routeApi}/${id}`,
      {...obj, urlMainImage: 'https://images-na.ssl-images-amazon.com/images/I/717MHGTzgbL._SY606_.jpg'},
      {headers: AuthService.getHeaders()}
    ).pipe(take(1));
  }

  post(obj: ProductAdd): Observable<Product> {
    return this._http.post<Product>(
      this._routeApi,
      {...obj, visible: false},
      {headers: AuthService.getHeaders()}
    ).pipe(take(1));
  }

  toggleVisibility(id: string, visible: boolean): Observable<void> {
    return this._http.patch<void>(
      `${this._routeApi}/${id}`,
      {visible},
      {headers: AuthService.getHeaders()}
    ).pipe(take(1));
  }
}
