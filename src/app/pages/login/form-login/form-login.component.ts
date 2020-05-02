import {Component} from '@angular/core';
import {FormControl} from '@angular/forms';
import {EErrorType, getMsgFront} from '../../../../shared/validations/msgErrorFunctionsFront';
import {routesFrontend} from '../../../../shared/constants/routes-frontend';
import {validators} from '../../../../shared/validations/validatorsCustom';
import {userSizes} from '../../../../shared/constants/field-size';
import {AuthService} from '../../../services/auth.service';
import {Router} from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-form-login',
  templateUrl: './form-login.component.html',
  styleUrls: ['./form-login.component.scss']
})
export class FormLoginComponent {

  readonly _sizes = userSizes;
  readonly _controlEmail = new FormControl(null, validators.emailValidator());
  readonly _controlPass = new FormControl(
    null, validators.textValidator(this._sizes.passwordMaxLen, this._sizes.passwordMinLen));
  readonly _getMsg = getMsgFront;
  readonly _routes = routesFrontend;

  constructor(
    private readonly _auth: AuthService,
    private readonly _router: Router
  ) {
  }

  signIn() {
    if (!AuthService.urlPrevius) {
      AuthService.urlPrevius = routesFrontend.home;
    }

    this._auth.login({
      email: this._controlEmail.value,
      password: this._controlPass.value
    }).subscribe(
      () => {},
      (err: HttpErrorResponse) => {
        if (err.status === 403) {
          this._controlPass.setErrors({[EErrorType.CUSTOM]: err.error.message});
        } else {
          this._controlEmail.setErrors({[EErrorType.CUSTOM]: err.error.message});
        }
      }
    );
  }
}
