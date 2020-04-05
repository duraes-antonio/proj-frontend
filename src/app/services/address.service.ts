import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {AuthService} from './auth.service';
import {Observable, of} from 'rxjs';
import {Address, AddressAdd} from '../models/address';
import {DataTests} from '../../shared/dataTests';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  private _routeApi = `${environment.apiUrl}/address`;

  /*TODO: Realizar requisições ao backend*/
  constructor(
    private _http: HttpClient,
    private _router: Router
  ) {
  }

  delete(id: string): Observable<Address> {
    return this._http.delete<Address>(
      `${this._routeApi}/${id}`,
      {headers: AuthService.getHeaders()}
    );
  }

  get(): Observable<Address[]> {
    return of(DataTests.addresses);
    return this._http.get<Address[]>(
      this._routeApi,
      {headers: AuthService.getHeaders()}
    );
  }

  getById(id: string): Observable<Address> {
    return this._http.get<Address>(
      `${this._routeApi}/${id}`,
      {headers: AuthService.getHeaders()}
    );
  }

  post(obj: AddressAdd): Observable<Address> {
    return this._http.post<Address>(
      this._routeApi,
      obj,
      {headers: AuthService.getHeaders()}
    );
  }

  patch(obj: object): Observable<void> {
    return this._http.patch<void>(
      this._routeApi,
      obj,
      {headers: AuthService.getHeaders()}
    );
  }
}

