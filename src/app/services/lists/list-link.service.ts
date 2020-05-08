import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {ListLink} from '../../models/componentes/list-link';
import {Observable} from 'rxjs';
import {AuthService} from '../auth.service';
import {httpService} from '../generic-http.service';
import {Product, ProductAdd} from '../../models/product';

@Injectable({
  providedIn: 'root'
})
export class ListLinkService {

  private readonly _endpoint = `${environment.apiUrl}/list-link`;

  constructor(private _http: HttpClient) {
  }

  delete(id: string): Observable<void> {
    return httpService.delete(this._endpoint, id, this._http, AuthService.getHeaders);
  }

  get(): Observable<ListLink[]> {
    return httpService.get<ListLink>(this._endpoint, this._http, AuthService.getHeaders);
  }

  getById(id: string): Observable<ListLink | undefined> {
    return httpService.getById<ListLink>(this._endpoint, id, this._http, AuthService.getHeaders);
  }

  patch(listPatch: object, id: string): Observable<ListLink> {
    return httpService.patch<ListLink>(
      this._endpoint, id, this._http, AuthService.getHeaders, listPatch
    );
  }

  post(list: ProductAdd): Observable<Product> {
    return httpService.post<ProductAdd>(
      this._endpoint, this._http, AuthService.getHeaders, list
    );
  }
}
