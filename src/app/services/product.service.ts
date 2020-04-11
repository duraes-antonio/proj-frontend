import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable, of} from 'rxjs';
import {AuthService} from './auth.service';
import {Product, ProductAdd} from '../models/product';
import {FilterProductBackend} from '../models/filters/filterProductUser.model';
import {DataTests} from '../../shared/dataTests';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private _http: HttpClient,
    private _router: Router
  ) {
  }

  private _routeApi = `${environment.apiUrl}/address`;

  static calculateCostFromArray(productQuantity: [Product, number][]): number {
    return productQuantity
      .map(prodUnits => prodUnits[0].priceWithDiscount * prodUnits[1])
      .reduce((prev, current) => prev + current);
  }

  clearEmptyFields(obj: any): any {
    if (!(obj instanceof Object)) {
      return obj;
    }

    const objClean: any = {};
    const emptys = [null, undefined, ''];

    Object.keys(obj).forEach(k => {
      if (emptys.indexOf(obj[k]) < 0) {
        if (obj[k] instanceof Array && obj[k].length) {
          const arrayClean = obj[k][0] instanceof Object
            ? (obj[k] as Array<any>)
              .map(item => this.clearEmptyFields(item))
              .filter(item => Object.keys(item).length > 0)
            : [...obj[k]];

          if (arrayClean.length) {
            objClean[k] = arrayClean;
          }
        } else if (obj[k] instanceof Object) {
          const subObjectClean = this.clearEmptyFields(obj[k]);

          if (Object.keys(subObjectClean).length > 0) {
            objClean[k] = subObjectClean;
          }
        } else {
          objClean[k] = obj[k];
        }
      }
    });
    return objClean;
  }

  primitiveFieldsToString(obj: any): any {
    const objTransformed: any = {};

    if (!(obj instanceof Object || obj instanceof Array)) {
      return obj.toString();
    }

    Object.keys(obj).forEach(key => {
      if (obj[key] instanceof Array) {
        objTransformed[key] = (obj[key] as Array<any>)
          .map(item => this.primitiveFieldsToString(item));
      } else if (obj[key] instanceof Object) {
        objTransformed[key] = this.primitiveFieldsToString(obj[key]);
      } else {
        objTransformed[key] = obj[key].toString();
      }
    });
    return objTransformed;
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
        fromObject: this.primitiveFieldsToString(this.clearEmptyFields(filter))
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
