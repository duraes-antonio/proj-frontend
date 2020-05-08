import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {AuthService} from '../auth.service';
import {httpService} from '../generic-http.service';
import {ListMarket, ListMarketAdd} from '../../models/componentes/list-market';

@Injectable({
  providedIn: 'root'
})
export class ListMarketService {

  private readonly _endpoint = `${environment.apiUrl}/list-market`;

  constructor(private _http: HttpClient) {
  }

  delete(id: string): Observable<void> {
    return httpService.delete(this._endpoint, id, this._http, AuthService.getHeaders);
  }

  get(): Observable<ListMarket[]> {
    return httpService.get(this._endpoint, this._http, AuthService.getHeaders);
  }

  getById(id: string): Observable<ListMarket | undefined> {
    return httpService.getById(this._endpoint, id, this._http, AuthService.getHeaders);
  }

  patch(listPatch: object, id: string): Observable<ListMarket> {
    return httpService.patch(this._endpoint, id, this._http, AuthService.getHeaders, listPatch);
  }

  post(list: ListMarketAdd): Observable<ListMarket> {
    return httpService.post(this._endpoint, this._http, AuthService.getHeaders, list);
  }
}
