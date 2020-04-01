import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {AuthService, LoginReturn} from './auth.service';
import {take, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _endpoint = `${environment.apiUrl}/user`;

  constructor(private _http: HttpClient) {
  }

  post(obj: { email: string, name: string, password: string }): Observable<LoginReturn> {
    return this._http
      .post<LoginReturn>(
        this._endpoint,
        obj,
        {headers: AuthService.getHeaders()}
      ).pipe(
        take(1),
        tap((data: LoginReturn) => AuthService.saveCredentials(data))
      );
  }
}