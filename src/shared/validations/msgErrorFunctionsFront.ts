import {AbstractControl} from '@angular/forms';

export enum EErrorType {
  CUSTOM = 'custom',
  EQUALS = 'equals',
  FORMAT = 'format',
  MIN_LEN = 'min_len',
  MIN_VAL = 'min_val',
  MAX_LEN = 'max_len',
  MAX_VAL = 'max_val',
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
  msgMustEquals(field1: string, field2: string): string {
    return `${field2} deve ser igual a ${field1}`;
  },

  msgInvalidFormat(example: string): string {
    const exampleTrim = example ? ` Exemplo: ${example}` : '';
    return `Formato inválido. ${exampleTrim}`;
  },
};

export function getMsgFront(control: AbstractControl, example?: string): string {
  if (!control.errors) {
    throw new Error('Não há erros para serem analisados!');
  }

  const errorsEnum = Object.keys(EErrorType);
  const error = Object.keys(control.errors).find(k => errorsEnum.some(e => e === k.toUpperCase()));

  if (!error || error === EErrorType.FORMAT) {
    if (!example) {
      throw new Error('É necessário passar um exemplo de dado como parâmetro');
    }
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
  } else if (error === EErrorType.EQUALS) {
    return buildErrorMsg.msgMustEquals(
      control.errors[error][0], control.errors[error][1]
    );
  } else if (error === EErrorType.CUSTOM) {
    return control.errors[error];
  } else {
    return control.errors[error];
  }
}
