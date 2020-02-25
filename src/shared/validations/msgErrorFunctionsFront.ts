import {FormControl} from '@angular/forms';

export enum EErrorType {
  FORMAT = 'format',
  MIN_LEN = 'minLen',
  MIN_VAL = 'minVal',
  MAX_LEN = 'maxLen',
  MAX_VAL = 'maxVal',
  REQUIRED = 'required'
}

export const buildErrorMsg = {
  msgMaxLen(maxLenght: number): string {
    return `Este campo deve possuir no máximo ${maxLenght} caracteres`;
  },
  msgMinLen(minLenght: number): string {
    return `Este campo deve possuir no mínimo ${minLenght} caracteres`;
  },
  msgExactlyLen(lenght: number): string {
    return `Este campo deve possuir exatamente ${lenght} caracteres`;
  },

  msgMaxValue(maxVal: number): string {
    return `Este campo não aceita valor maior que ${maxVal}`;
  },
  msgMinValue(minVal: number): string {
    return `Este campo não aceita valor menor que ${minVal}`;
  },
  msgNullOrEmpty(): string {
    return `Este campo deve ser preenchido`;
  },

  msgInvalidFormat(example: string): string {
    const exampleTrim = example ? ` Exemplo: ${example}` : '';
    return `Este campo não está em um formato válido.${exampleTrim}`;
  },
};

export function getMsgFront(control: FormControl, example?: string): string {
  for (const error in control.errors) {
    if (error === EErrorType.FORMAT) {
      return buildErrorMsg.msgInvalidFormat(example);
    } else if (error === EErrorType.MAX_LEN) {
      return buildErrorMsg.msgMaxLen(control.errors[error]);
    } else if (error === EErrorType.MAX_VAL) {
      return buildErrorMsg.msgMaxValue(control.errors[error]);
    } else if (error === EErrorType.MIN_LEN) {
      return buildErrorMsg.msgMinLen(control.errors[error]);
    } else if (error === EErrorType.MIN_VAL) {
      return buildErrorMsg.msgMinValue(control.errors[error]);
    } else if (error === EErrorType.REQUIRED) {
      return buildErrorMsg.msgNullOrEmpty();
    } else {
      return control.errors[error];
    }
  }
}
