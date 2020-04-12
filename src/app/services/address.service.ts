import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {AuthService} from './auth.service';
import {Observable, of} from 'rxjs';
import {Address, AddressAdd} from '../models/address';
import {DataTests} from '../../shared/dataTests';
import {map, take} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  private _routeApi = `${environment.apiUrl.replace(/\/$/, '')}/address`;

  /*TODO: Realizar requisições ao backend*/
  constructor(
    private readonly _http: HttpClient,
    private readonly _router: Router
  ) {
  }

  delete(id: string): Observable<Address> {
    return this._http.delete<Address>(
      `${this._routeApi}/${id}`,
      {headers: AuthService.getHeaders()}
    ).pipe(take(1));
  }

  get(): Observable<Address[]> {
    return of(DataTests.addresses);
    return this._http.get<Address[]>(
      this._routeApi,
      {headers: AuthService.getHeaders()}
    ).pipe(take(1));
  }

  getFromViaCEP(CEP: string): Observable<AddressAdd> {
    return this._http
      .get(`https://viacep.com.br/ws/${CEP.replace(/\D+/, '')}/json/`)
      .pipe(
        map((address: any) => {
          return {
            zipCode: address.cep,
            street: address.logradouro,
            neighborhood: address.bairro,
            city: address.localidade,
            state: address.uf
          };
        }),
        take(1)
      );
  }

  getById(id: string): Observable<Address | undefined> {
    return this._http.get<Address>(
      `${this._routeApi}/${id}`,
      {headers: AuthService.getHeaders()}
    ).pipe(take(1));
  }

  getMain(): Observable<Address | undefined> {
    return of(DataTests.addresses[0]);
    return this._http.get<Address>(
      `${this._routeApi}/main`,
      {headers: AuthService.getHeaders()}
    ).pipe(take(1));
  }

  post(obj: AddressAdd): Observable<Address> {
    return this._http.post<Address>(
      this._routeApi,
      {...obj, zipCode: obj.zipCode.replace('-', '')} as AddressAdd,
      {headers: AuthService.getHeaders()}
    ).pipe(take(1));
  }

  patch(obj: any): Observable<void> {
    return this._http.patch<void>(
      this._routeApi,
      {obj, zipCode: obj.zipCode ? obj.zipCode.replace('-', '') : undefined},
      {headers: AuthService.getHeaders()}
    ).pipe(take(1));
  }
}

