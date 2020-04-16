import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable, of} from 'rxjs';
import {AuthService} from './auth.service';
import {DataTests} from '../../shared/dataTests';
import {httpService} from './generic-http.service';
import {ListMarket, ListMarketAdd} from '../models/componentes/list-market';
import {take} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ListMarketService {

  private readonly _endpointUrl = `${environment.apiUrl}/list-link`;

  constructor(private _http: HttpClient) {
  }

  delete(id: string): Observable<void> {
    return httpService.delete(
      this._endpointUrl, id, this._http, AuthService.getHeaders
    );
  }

  /*TODO: Subsituir dados mockados por consulta*/
  get(): Observable<ListMarket[]> {
    return of(DataTests.listMarkets).pipe(take(1));
    return httpService.get<ListMarket>(this._endpointUrl, this._http, AuthService.getHeaders);
  }

  /*TODO: Subsituir dados mockados por consulta*/
  getById(id: string): Observable<ListMarket | undefined> {
    return of(DataTests.listMarkets.find(p => p.id === id)).pipe(take(1));
    return httpService.getById<ListMarket>(
      this._endpointUrl, id, this._http, AuthService.getHeaders
    );
  }

  patch(obj: object, id: string): Observable<ListMarket> {
    return httpService.patch<ListMarket>(
      this._endpointUrl, id, this._http, AuthService.getHeaders, obj
    );
  }

  post(obj: ListMarketAdd): Observable<ListMarket> {
    return httpService.post<ListMarketAdd>(
      this._endpointUrl, this._http, AuthService.getHeaders, obj
    );
  }
}
