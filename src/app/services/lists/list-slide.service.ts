import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {AuthService} from '../auth.service';
import {httpService} from '../generic-http.service';
import {Sequence, SequenceAdd} from '../../models/componentes/sequence';
import {Slide} from '../../models/componentes/slide';

@Injectable({
  providedIn: 'root'
})
export class ListSlideService {

  private readonly _endpoint = `${environment.apiUrl}/list-slide`;

  constructor(private _http: HttpClient) {
  }

  delete(id: string): Observable<void> {
    return httpService.delete(this._endpoint, id, this._http, AuthService.getHeaders);
  }

  get(): Observable<Sequence<Slide>[]> {
    return httpService.get(this._endpoint, this._http, AuthService.getHeaders);
  }

  getById(id: string): Observable<Sequence<Slide> | undefined> {
    return httpService.getById(this._endpoint, id, this._http, AuthService.getHeaders);
  }

  patch(listPatch: object, id: string): Observable<Sequence<Slide>> {
    return httpService.patch(this._endpoint, id, this._http, AuthService.getHeaders, listPatch);
  }

  post(list: SequenceAdd<Slide>): Observable<Sequence<Slide>> {
    return httpService.post(this._endpoint, this._http, AuthService.getHeaders, list);
  }
}
