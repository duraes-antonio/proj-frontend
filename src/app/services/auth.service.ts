'use strict';
import {EventEmitter, Injectable} from '@angular/core';
import {IUserLogin} from '../interfaces/userLogin';
import {HttpClient} from '@angular/common/http';
import {Usuario} from '../models/Usuario';
import {ERole} from '../enum/roles';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  static userLoggedEmitter = new EventEmitter<boolean>();
  static userRole: ERole = ERole.UNKNOWN;
  static userInfo: Usuario;
  private _userLogged = false;

  constructor(private http: HttpClient) {
  }

  /*TODO: Realizar validação com backend*/
  signIn(dataLogin: IUserLogin) {
    AuthService.userRole = ERole.CUSTOMER;
    AuthService.userLoggedEmitter.emit(true);
  }

  signOut() {
    AuthService.userRole = ERole.UNKNOWN;
    AuthService.userLoggedEmitter.emit(false);
  }
}
