'use strict';
import {AbstractControl, FormControl, ValidatorFn} from '@angular/forms';
import {masks} from '../input-masks/maskFunctions';
import {validation} from './validationFunctions';
import {userSizes} from '../constants/fieldSize';
import {EErrorType} from './msgErrorFunctionsFront';

export const validators = {
  cepValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const cep = control.value ? masks.cep(control.value) : '';

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

      if (!validation.atMaxLen(email, userSizes.emailMaxLen)) {
        return {[EErrorType.MAX_LEN]: true};
      }

      if (!validation.validEmail(email)) {
        return {[EErrorType.FORMAT]: true};
      }
      return null;
    };
  },
  numberValidator(min: number, max: number, required = false): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const num = masks.numberUnsigned(control.value);

      if (!required && !validation.hasValue(control.value)) {
        return null;
      }
      if (required && !validation.hasValue(control.value)) {
        return {[EErrorType.REQUIRED]: true};
      } else if (!validation.validNumber(num)) {
        return {[EErrorType.FORMAT]: true};
      } else if (+num > max) {
        return {[EErrorType.MAX_VAL]: max};
      } else if (+num < min) {
        return {[EErrorType.MIN_VAL]: min};
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
  }
};
