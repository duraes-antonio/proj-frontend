import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {ListLink, ListLinkAdd} from '../models/componentes/list-link';
import {Observable, pipe} from 'rxjs';
import {AuthService} from './auth.service';
import {take} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ListLinkService {

  private readonly _endpointUrl = `${environment.apiUrl}/client`;

  constructor(
    private _http: HttpClient,
  ) { }

  delete(id: string): Observable<void> {
    return this._http.delete<void>(
      `${this._endpointUrl}/list-link/${id}`,
      {headers: AuthService.getHeaders()}
    ).pipe(take(1));
  }

  get(): Observable<ListLink[]> {
    return this._http.get<ListLink[]>(
      `${this._endpointUrl}/list-link`,
      {headers: AuthService.getHeaders()}
    ).pipe(take(1));
  }

  getById(id: string): Observable<ListLink> {
    return this._http.get<ListLink>(
      `${this._endpointUrl}/list-link/${id}`,
      {headers: AuthService.getHeaders()}
    ).pipe(take(1));
  }

  patch(id: string, objPatch: object): Observable<ListLink> {
    return this._http.patch<ListLink>(
      `${this._endpointUrl}/list-link/${id}`,
      objPatch,
      {headers: AuthService.getHeaders()}
    ).pipe(take(1));
  }

  post(id: string, obj: ListLinkAdd): Observable<ListLink> {
    return this._http.post<ListLink>(
      `${this._endpointUrl}/list-link/${id}`,
      obj,
      {headers: AuthService.getHeaders()}
    ).pipe(take(1));
  }
}
