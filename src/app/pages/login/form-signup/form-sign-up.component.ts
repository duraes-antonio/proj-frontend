import {Component} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {masks} from '../../../../shared/input-masks/maskFunctions';
import {validators} from '../../../../shared/validations/validatorsCustom';
import {userSizes} from '../../../../shared/constants/field-size';
import {getMsgFront} from '../../../../shared/validations/msgErrorFunctionsFront';
import {Router} from '@angular/router';
import {routesFrontend} from '../../../../shared/constants/routes-frontend';
import {UserService} from '../../../services/user.service';
import {ERole} from '../../../enum/roles';

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
  readonly _controlCPF = new FormControl(null, validators.cpfValidator());
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
    event.preventDefault();
    this._controlPhone.setValue(masks.phone(this._controlPhone.value));
  }

  formatCPF(event: Event) {
    event.preventDefault();
    this._controlCPF.setValue(masks.cpf(this._controlCPF.value));
  }

  /*TODO: Serviço para lançar erros para UI*/
  signIn() {
    this._userServ.post({
      codeArea: +((this._controlPhone.value as string).split(' ')[0].replace(/[^\d]/g, '')),
      cpf: this._controlCPF.value.replace(/[^\d]/g, ''),
      email: this._controlEmail.value,
      name: this._controlName.value,
      password: this._controlPass.value,
      phone: (this._controlPhone.value as string).split(' ')[1].replace(/[^\d]/g, ''),
      roles: [ERole.CUSTOMER]
    }).subscribe(() => {
      this._router.navigate([routesFrontend.home]);
    });
  }
}
