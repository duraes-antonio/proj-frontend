import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable, of} from 'rxjs';
import {AuthService} from './auth.service';
import {DataTests} from '../../shared/dataTests';
import {httpService} from './generic-http.service';
import {ListProduct, ListProductAdd} from '../models/componentes/list-product';

@Injectable({
  providedIn: 'root'
})
export class ListProductService {

  private readonly _endpointUrl = `${environment.apiUrl}/list-link`;

  constructor(private _http: HttpClient) {
  }

  delete(id: string): Observable<void> {
    return httpService.delete(
      this._endpointUrl, id, this._http, AuthService.getHeaders
    );
  }

  /*TODO: Subsituir dados mockados por consulta*/
  get(): Observable<ListProduct[]> {
    return of(DataTests.listProducts);
    return httpService.get<ListProduct>(this._endpointUrl, this._http, AuthService.getHeaders);
  }

  /*TODO: Subsituir dados mockados por consulta*/
  getById(id: string): Observable<ListProduct | undefined> {
    return of(DataTests.listProducts.find(p => p.id === id));
    return httpService.getById<ListProduct>(
      this._endpointUrl, id, this._http, AuthService.getHeaders
    );
  }

  getRelateds(productId: string): Observable<ListProduct> {
    return of(DataTests.listProducts[0]);
    return httpService.getById<ListProduct>(
      `${this._endpointUrl}/related`,
      productId,
      this._http,
      AuthService.getHeaders
    );
  }

  patch(obj: object, id: string): Observable<ListProduct> {
    return httpService.patch<ListProduct>(
      this._endpointUrl, id, this._http, AuthService.getHeaders, obj
    );
  }

  post(obj: ListProductAdd): Observable<ListProduct> {
    return httpService.post<ListProductAdd>(
      this._endpointUrl, this._http, AuthService.getHeaders, obj
    );
  }
}
