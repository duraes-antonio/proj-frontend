import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpEvent} from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from './auth.service';
import {Product, ProductAdd} from '../models/product';
import {FilterProduct, FilterProductResponse} from '../models/filters/filter-product';
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

  delete(id: string): Observable<void> {
    return httpService.delete(this._endpoint, id, this._http, AuthService.getHeaders);
  }

  get(filter?: FilterProduct): Observable<Product[]> {
    return httpService.get(this._endpoint, this._http, AuthService.getHeaders, filter);
  }

  getForSearch(filter?: FilterProduct): Observable<FilterProductResponse> {
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

  uploadTempImage(image: File): Observable<HttpEvent<{ data: string }>> {
    const formData = new FormData();
    formData.append('image', image, image.name);
    return this._http.post<{ data: string }>(
      `${this._endpoint}/image-temp`,
      formData,
      {
        headers: AuthService.getHeaders().delete('Content-Type'),
        observe: 'events',
        reportProgress: true
      }
    );
    /*.pipe(
    map((res) => res.data),
    take(1)
  );*/
  }
}
