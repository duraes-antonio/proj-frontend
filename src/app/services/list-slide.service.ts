import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable, of} from 'rxjs';
import {AuthService} from './auth.service';
import {DataTests} from '../../shared/dataTests';
import {httpService} from './generic-http.service';
import {ListSlide, ListSlideAdd} from '../models/componentes/slider';
import {take} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ListSlideService {

  private readonly _endpointUrl = `${environment.apiUrl}/list-slide`;

  constructor(private _http: HttpClient) {
  }

  delete(id: string): Observable<void> {
    return httpService.delete(
      this._endpointUrl, id, this._http, AuthService.getHeaders
    );
  }

  /*TODO: Subsituir dados mockados por consulta*/
  get(): Observable<ListSlide[]> {
    return of(DataTests.sliders).pipe(take(1));
    return httpService.get<ListSlide>(this._endpointUrl, this._http, AuthService.getHeaders);
  }

  /*TODO: Subsituir dados mockados por consulta*/
  getById(id: string): Observable<ListSlide | undefined> {
    return of(DataTests.sliders.find(p => p.id === id)).pipe(take(1));
    return httpService.getById<ListSlide>(
      this._endpointUrl, id, this._http, AuthService.getHeaders
    );
  }

  patch(obj: object, id: string): Observable<ListSlide> {
    return httpService.patch<ListSlide>(
      this._endpointUrl, id, this._http, AuthService.getHeaders, obj
    );
  }

  post(obj: ListSlideAdd): Observable<ListSlide> {
    return httpService.post<ListSlideAdd>(
      this._endpointUrl, this._http, AuthService.getHeaders, obj
    );
  }
}
