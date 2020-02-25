import {Component} from '@angular/core';
import {FormControl} from '@angular/forms';
import {getMsgFront} from '../../../../shared/validations/msgErrorFunctionsFront';
import {routes} from '../../../../shared/constants/routes';
import {validators} from '../../../../shared/validations/validatorsCustom';
import {fieldSize} from '../../../../shared/constants/fieldSize';

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
}
