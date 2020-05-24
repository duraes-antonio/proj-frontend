import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {AuthService, LoginReturn} from './auth.service';
import {take, tap} from 'rxjs/operators';
import {User, UserAdd, UserSearch} from '../models/user';
import {httpService} from './generic-http.service';
import {FilterUser} from '../models/filters/filter-user';
import {ERole} from '../enum/roles';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _endpoint = `${environment.apiUrl}/user`;

  constructor(private readonly _http: HttpClient) {
  }

  get(filter?: FilterUser): Observable<UserSearch> {
    return httpService.getSingle(`${this._endpoint}/search`, this._http, AuthService.getHeaders, filter);
  }

  patchRoles(userId: string, roles: ERole[]): Observable<User> {
    return this._http.patch<User>(
      `${this._endpoint}/${userId}/roles`,
      roles,
      {headers: AuthService.getHeaders()}
    ).pipe(take(1));
  }

  post(user: UserAdd): Observable<LoginReturn> {
    return httpService.post(this._endpoint, this._http, AuthService.getHeaders, user)
      .pipe(tap((data: LoginReturn) => AuthService.saveCredentials(data)));
  }
}
