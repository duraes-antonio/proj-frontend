import {Component} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {masks} from '../../../../shared/input-masks/maskFunctions';
import {validators} from '../../../../shared/validations/validatorsCustom';
import {userSizes} from '../../../../shared/constants/fieldSize';
import {getMsgFront} from '../../../../shared/validations/msgErrorFunctionsFront';
import {Router} from '@angular/router';
import {routesFrontend} from '../../../../shared/constants/routesFrontend';
import {UserService} from '../../../services/user.service';

@Component({
  selector: 'app-form-cad-cliente',
  templateUrl: './form-sign-up.component.html',
  styleUrls: ['./form-sign-up.component.scss']
})
export class FormSignUpComponent {

  constructor(
    private readonly _userServ: UserService,
    private readonly _router: Router
  ) {
  }

  readonly _sizes = userSizes;
  readonly _getMsg = getMsgFront;
  readonly _controlName = new FormControl(null, validators.textValidator(this._sizes.nameMaxLen));
  readonly _controlEmail = new FormControl(null, validators.emailValidator());
  readonly _controlPhone = new FormControl(null, validators.phoneValidator());
  readonly _controlPass = new FormControl(
    null,
    validators.textValidator(this._sizes.passwordMaxLen, this._sizes.passwordMinLen)
  );
  readonly _controlPassConfirm = new FormControl(
    null,
    validators.passEqualsValidator(this._controlPass)
  );
  readonly _formG = new FormGroup({
    name: this._controlName,
    email: this._controlEmail,
    phone: this._controlPhone,
    pass: this._controlPass,
    passConfirm: this._controlPassConfirm
  });

  formatPhone(event: Event) {
    this._controlPhone.setValue(masks.phone(this._controlPhone.value));
  }

  /*TODO: Serviço para lançar erros para UI*/
  signIn() {
    this._userServ.post({
      name: this._controlName.value,
      email: this._controlEmail.value,
      password: this._controlPass.value
    }).subscribe(() => {
      this._router.navigate([routesFrontend.home]);
    });
  }
}
