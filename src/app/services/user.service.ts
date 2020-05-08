import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {AuthService, LoginReturn} from './auth.service';
import {tap} from 'rxjs/operators';
import {UserAdd} from '../models/user';
import {httpService} from './generic-http.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _endpoint = `${environment.apiUrl}/user`;

  constructor(private readonly _http: HttpClient) {
  }

  post(user: UserAdd): Observable<LoginReturn> {
    return httpService.post(this._endpoint, this._http, AuthService.getHeaders, user)
      .pipe(tap((data: LoginReturn) => AuthService.saveCredentials(data)));
  }
}
