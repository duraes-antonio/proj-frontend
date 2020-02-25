import {Component} from '@angular/core';
import {FormControl} from '@angular/forms';
import {masks} from '../../../../shared/input-masks/maskFunctions';
import {validators} from '../../../../shared/validations/validatorsCustom';
import {fieldSize} from '../../../../shared/constants/fieldSize';
import {getMsgFront} from '../../../../shared/validations/msgErrorFunctionsFront';

@Component({
  selector: 'app-form-cad-cliente',
  templateUrl: './form-cad-cliente.component.html',
  styleUrls: ['./form-cad-cliente.component.scss']
})
export class FormCadClienteComponent {

  readonly _sizes = fieldSize;
  readonly _getMsg = getMsgFront;
  readonly _controlName = new FormControl(null, validators.textValidator(this._sizes.nameMaxLen));
  readonly _controlEmail = new FormControl(null, validators.emailValidator());
  readonly _controlPhone = new FormControl(null, validators.phoneValidator());
  readonly _controlPass = new FormControl(
    null, validators.textValidator(this._sizes.passwordMaxLen, this._sizes.passwordMinLen));
  readonly _controlPassConfirm = new FormControl(
    null, validators.textValidator(this._sizes.passwordMaxLen, this._sizes.passwordMinLen));

  formatPhone(event: Event) {
    this._controlPhone.setValue(masks.phone(this._controlPhone.value));
  }
}
