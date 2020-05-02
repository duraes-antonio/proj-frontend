import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {AuthService} from './auth.service';
import {Observable} from 'rxjs';
import {Address, AddressAdd} from '../models/address';
import {map, take} from 'rxjs/operators';
import {httpService} from './generic-http.service';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  private _routeApi = `${environment.apiUrl.replace(/\/$/, '')}/address`;

  constructor(
    private readonly _http: HttpClient,
    private readonly _router: Router
  ) {
  }

  delete(id: string): Observable<void> {
    return httpService.delete(this._routeApi, id, this._http, AuthService.getHeaders);
  }

  get(): Observable<Address[]> {
    return httpService.get(this._routeApi, this._http, AuthService.getHeaders);
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
    return httpService.getById(this._routeApi, id, this._http, AuthService.getHeaders);
  }

  post(obj: AddressAdd): Observable<Address> {
    return httpService.post(
      this._routeApi, this._http, AuthService.getHeaders,
      {...obj, zipCode: obj.zipCode.replace('-', '')}
    );
  }

  patch(id: string, obj: any): Observable<Address> {
    const cloneObj = obj?.zipCode
      ? {...obj, zipCode: obj.zipCode?.replace('-', '')}
      : obj;
    return httpService.patch(this._routeApi, id, this._http, AuthService.getHeaders, cloneObj);
  }
}

