'use strict';
import {AbstractControl, FormControl, ValidatorFn} from '@angular/forms';
import {masks} from '../input-masks/maskFunctions';
import {validation} from './validationFunctions';
import {fieldSize} from '../constants/fieldSize';
import {EErrorType} from './msgErrorFunctionsFront';

export const validators = {
  cepValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const cep = masks.cep(control.value);

      if (!validation.hasValue(cep)) {
        return {[EErrorType.REQUIRED]: true};
      } else if (!validation.validCEP(cep.replace('-', ''))) {
        return {[EErrorType.FORMAT]: true};
      }
      return null;
    };
  },
  emailValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {

      if (!validation.hasValue(control.value)) {
        return {[EErrorType.REQUIRED]: true};
      }

      const email = control.value.toString().trim();

      if (!validation.atMaxLen(email, fieldSize.emailMaxLen)) {
        return {[EErrorType.MAX_LEN]: true};
      }

      if (!validation.validEmail(email)) {
        return {[EErrorType.FORMAT]: true};
      }
      return null;
    };
  },
  passEqualsValidator(originalPassCtrl: FormControl): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {

      if (!control.value) {
        return {[EErrorType.REQUIRED]: true};
      }

      if (originalPassCtrl.value === control.value) {
        return null;
      }

      return {[EErrorType.EQUALS]: ['Senha', 'Confirmação de Senha']};
    };
  },
  textValidator(maxLen: number, minLen = 1, required = true): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {

      if (validation.hasValue(control.value)) {
        const name = control.value.toString().trim();

        if (!validation.atLeastLen(name, minLen)) {
          return {[EErrorType.MIN_LEN]: minLen};
        }

        if (!validation.atMaxLen(name, maxLen)) {
          return {[EErrorType.MAX_LEN]: maxLen};
        }
        return null;
      }

      return required ? {[EErrorType.REQUIRED]: true} : null;
    };
  },
  phoneValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {

      if (!validation.hasValue(control.value)) {
        return {[EErrorType.REQUIRED]: true};
      }

      const phoneNumber = control.value.toString().trim();

      if (!validation.validPhone(phoneNumber)) {
        return {[EErrorType.FORMAT]: true};
      }
      return null;
    };
  }
};
