import {Component} from '@angular/core';
import {FormControl} from '@angular/forms';
import {getMsgFront} from '../../../../shared/validations/msgErrorFunctionsFront';
import {routes} from '../../../../shared/constants/routes';
import {validators} from '../../../../shared/validations/validatorsCustom';
import {fieldSize} from '../../../../shared/constants/fieldSize';
import {AuthService} from '../../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-form-login',
  templateUrl: './form-login.component.html',
  styleUrls: ['./form-login.component.scss']
})
export class FormLoginComponent {

  readonly _sizes = fieldSize;
  readonly _controlEmail = new FormControl(null, validators.emailValidator());
  readonly _controlPass = new FormControl(
    null, validators.textValidator(this._sizes.passwordMaxLen, this._sizes.passwordMinLen));
  readonly _getMsg = getMsgFront;
  readonly _routes = routes;

  constructor(
    private auth: AuthService,
    private router: Router
  ) {
  }

  signIn() {
    this.auth.signIn({
      email: this._controlEmail.value,
      password: this._controlPass.value
    });
    this.router.navigateByUrl(routes.home);
  }
}
