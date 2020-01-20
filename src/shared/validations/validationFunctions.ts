/* tslint:disable-next-line:max-line-length
 * Expressão baseada no regex usado na API do Angular Form Validators:
 * https://github.com/angular/angular/blob/e0ad9ecda0b8a541b405d2ab35335b90ceb21fd1/packages/forms/src/validators.ts#L254
*/
const regex = /^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

const validation = {
  atMaxLen(value: string, maxLenght: number): boolean {
    return value && value.length <= maxLenght;
  },
  atLeastLen(value: string, minLenght: number): boolean {
    return value && value.length >= minLenght;
  },
  exactlytLen(value: string, lenght: number): boolean {
    return value && value.length === lenght;
  },
  atMaxValue(value: number, maxVal: number): boolean {
    return value && value <= maxVal;
  },
  atLeastValue(value: number, minVal: number): boolean {
    return value !== undefined && value !== null && value >= minVal;
  },
  notNullOrEmpty(value): boolean {
    return !(value === undefined || value == null || value === '');
  },
  validCEP(cep: string): boolean {
    return true;
  },
  validEmail(email: string): boolean {
    return email && regex.test(email);
  }
};

const buildErrorMsg = {
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

  msgInvalidFormat(fieldName: string): string {
    return `O campo ${fieldName} não está em um formato válido`;
  },
};

export {validation, buildErrorMsg};
