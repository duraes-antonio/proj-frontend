import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable, of} from 'rxjs';
import {AuthService} from '../auth.service';
import {DataTests} from '../../../shared/dataTests';
import {httpService} from '../generic-http.service';
import {ListProduct, ListProductAdd} from '../../models/componentes/list-product';
import {take} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ListProductService {

  private readonly _endpoint = `${environment.apiUrl}/list-product`;

  constructor(private _http: HttpClient) {
  }

  delete(id: string): Observable<void> {
    return httpService.delete(this._endpoint, id, this._http, AuthService.getHeaders);
  }

  get(): Observable<ListProduct[]> {
    return httpService.get(this._endpoint, this._http, AuthService.getHeaders);
  }

  getById(id: string): Observable<ListProduct | undefined> {
    return httpService.getById(this._endpoint, id, this._http, AuthService.getHeaders);
  }

  /*TODO: Subsituir dados mockados por consulta*/
  getRelateds(productId: string): Observable<ListProduct> {
    return of(DataTests.listProducts[0]).pipe(take(1));
    return httpService.getById(
      `${this._endpoint}/related`, productId, this._http, AuthService.getHeaders
    );
  }

  patch(listPatch: object, id: string): Observable<ListProduct> {
    return httpService.patch(this._endpoint, id, this._http, AuthService.getHeaders, listPatch);
  }

  post(list: ListProductAdd): Observable<ListProduct> {
    return httpService.post(this._endpoint, this._http, AuthService.getHeaders, list);
  }
}
