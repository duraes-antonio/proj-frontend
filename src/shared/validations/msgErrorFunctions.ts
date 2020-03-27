import {FormControl} from '@angular/forms';
import {EErrorType} from './msgErrorFunctionsFront';

export const buildErrorMsg = {
  msgMaxLen(fieldName: string, maxLenght: number): string {
    return `O campo ${fieldName} deve possuir no máximo ${maxLenght} caracteres`;
  },
  msgMinLen(fieldName: string, minLenght: number): string {
    return `O campo ${fieldName} deve possuir no mínimo ${minLenght} caracteres`;
  },
  msgExactlyLen(fieldName: string, lenght: number): string {
    return `O campo ${fieldName} deve possuir exatamente ${lenght} caracteres`;
  },

  msgMaxValue(fieldName: string, maxVal: number): string {
    return `O campo ${fieldName} não aceita valor maior que ${maxVal}`;
  },
  msgMinValue(fieldName: string, minVal: number): string {
    return `O campo ${fieldName} não aceita valor menor que ${minVal}`;
  },
  msgNullOrEmpty(fieldName: string): string {
    return `O campo ${fieldName} deve ser preenchido`;
  },
  msgMustEquals(field1: string, field2: string): string {
    return `${field2} deve ser igual a ${field2}`;
  },

  msgInvalidFormat(fieldName: string): string {
    return `O campo ${fieldName} não está em um formato válido`;
  },
};

export function getMsg(field: string, control: FormControl): string {
  if (!control.errors) {
    throw new Error('Não há erros para serem analisados!');
  }

  const keyError = Object.keys(control.errors)[0];
  const error = control.errors[keyError];

  if (error === EErrorType.FORMAT) {
    return buildErrorMsg.msgInvalidFormat(field);
  } else if (error === EErrorType.MAX_LEN) {
    return buildErrorMsg.msgMaxLen(field, control.errors[error]);
  } else if (error === EErrorType.MAX_VAL) {
    return buildErrorMsg.msgMaxValue(field, control.errors[error]);
  } else if (error === EErrorType.MIN_LEN) {
    return buildErrorMsg.msgMinLen(field, control.errors[error]);
  } else if (error === EErrorType.MIN_VAL) {
    return buildErrorMsg.msgMinValue(field, control.errors[error]);
  } else if (error === EErrorType.REQUIRED) {
    return buildErrorMsg.msgNullOrEmpty(field);
  } else {
    return control.errors[error];
  }
}
