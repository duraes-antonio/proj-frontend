'use strict';
import {EventEmitter, Injectable} from '@angular/core';
import {UserLogin} from '../models/user-login';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from '../models/user';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import * as jwt_decode from 'jwt-decode';
import * as moment from 'moment';
import {take, tap} from 'rxjs/operators';
import {Router} from '@angular/router';
import {routesFrontend} from '../../shared/constants/routesFrontend';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  static urlPrevius = '';
  static userLoggedEmitter = new EventEmitter<boolean>();
  static userLogged?: User;
  private _routeApi = `${environment.apiUrl.replace(/\/$/, '')}/auth`;

  constructor(
    private readonly _http: HttpClient,
    private readonly _router: Router
  ) {
  }

  static getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': AuthService.getTokenLocal() ?? ''
    });
  }

  static saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  static getTokenLocal(): string | null {
    return localStorage.getItem('token') ?? '';
  }

  static remTokenLocal() {
    localStorage.removeItem('token');
  }

  static isLoggedIn(): boolean {
    const token = AuthService.getTokenLocal();

    if (!token) {
      return false;
    }
    const data = AuthService._decodeToken(token);
    return !!data && moment().isBefore(data.exp * 1000);
  }

  static loadFromLocalToken() {
    const token = AuthService.getTokenLocal();

    if (AuthService.isLoggedIn() && !AuthService.userLogged && token) {
      AuthService.userLogged = AuthService._decodeToken(token) as User ?? null;
      AuthService.userLoggedEmitter.emit(true);
    }
  }

  private static _decodeToken(jwt: string): TokenData | null {
    try {
      return jwt_decode(jwt);
    } catch (Error) {
      return null;
    }
  }

  static saveCredentials(data: LoginReturn) {
    AuthService.saveToken(data.token);
    AuthService.userLogged = data.user;
    AuthService.userLoggedEmitter.emit(true);
  }

  login(dataLogin: UserLogin): Observable<LoginReturn> {
    return this._http
      .post<LoginReturn>(`${this._routeApi}/authenticate`, dataLogin)
      .pipe(
        take(1),
        tap((data: LoginReturn) => {
          AuthService.saveCredentials(data);
          if (AuthService.urlPrevius) {
            this._router.navigate([AuthService.urlPrevius]);
            AuthService.urlPrevius = '';
          }
        })
      );
  }

  logout(): Observable<void> {
    return this._http
      .post<void>(
        `${this._routeApi}/signout`,
        {},
        {headers: AuthService.getHeaders()})
      .pipe(
        take(1),
        tap(() => {
          AuthService.remTokenLocal();
          AuthService.userLogged = undefined;
          AuthService.userLoggedEmitter.emit(false);
          this._router.navigate([routesFrontend.home]);
        })
      );
  }
}

export interface LoginReturn {
  token: string;
  user: User;
}

export interface TokenData extends User {
  iat: number;
  exp: number;
}
