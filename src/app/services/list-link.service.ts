import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {ListLink} from '../models/componentes/list-link';
import {Observable, of} from 'rxjs';
import {AuthService} from './auth.service';
import {DataTests} from '../../shared/dataTests';
import {httpService} from './generic-http.service';
import {FilterBasic} from '../models/filters/filter-base';
import {Product, ProductAdd} from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ListLinkService {

  private readonly _endpointUrl = `${environment.apiUrl}/list-link`;

  constructor(private _http: HttpClient) {
  }

  delete(id: string): Observable<void> {
    return httpService.delete(
      this._endpointUrl, id, this._http, AuthService.getHeaders
    );
  }

  /*TODO: Subsituir dados mockados por consulta*/
  get(filter: FilterBasic): Observable<ListLink[]> {
    return httpService.get<ListLink>(
      this._endpointUrl, this._http, AuthService.getHeaders, filter
    );
  }

  /*TODO: Subsituir dados mockados por consulta*/
  getById(id: string): Observable<ListLink | undefined> {
    return of(DataTests.listLinks.find(p => p.id === id));
    return httpService.getById<ListLink>(
      this._endpointUrl, id, this._http, AuthService.getHeaders
    );
  }

  patch(obj: object, id: string): Observable<ListLink> {
    return httpService.patch<ListLink>(
      this._endpointUrl, id, this._http, AuthService.getHeaders, obj
    );
  }

  post(obj: ProductAdd): Observable<Product> {
    return httpService.post<ProductAdd>(
      this._endpointUrl, this._http, AuthService.getHeaders, obj
    );
  }
}
