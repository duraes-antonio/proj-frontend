/* tslint:disable-next-line:max-line-length
 * Expressão baseada no regex usado na API do Angular Form Validators:
 * https://github.com/angular/angular/blob/e0ad9ecda0b8a541b405d2ab35335b90ceb21fd1/packages/forms/src/validators.ts#L254
*/
const regexEmail = /^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
const regexPhone = /^\([1-9]{2}\)\s?(?:[2-8]|9[1-9])[0-9]{3}-?[0-9]{4}$/;
const regexNumber = /(^\d+(d*|(\.\d+))?$)/;

const validation = {
  atMaxLen(value: string, maxLenght: number): boolean {
    return this.hasValue(value) && value.length <= maxLenght;
  },
  atLeastLen(value: string, minLenght: number): boolean {
    return this.hasValue(value) && value.length >= minLenght;
  },
  exactlytLen(value: string, lenght: number): boolean {
    return this.hasValue(value) && value.length === lenght;
  },
  atMaxValue(value: number, maxVal: number): boolean {
    return value !== undefined && value !== null && value <= maxVal;
  },
  atLeastValue(value: number, minVal: number): boolean {
    return value !== undefined && value !== null && value >= minVal;
  },
  hasValue(value: any): boolean {
    return !(value === undefined || value == null || value === '');
  },
  validCEP(cep: string): boolean {
    return validation.hasValue(cep) && validation.exactlytLen(cep, 8);
  },
  /*Adaptado de: https://github.com/tiagoporto/gerador-validador-cpf/blob/master/src/js/CPF.ts*/
  validCPFFormat(value: string): boolean {
    return !(!validation.hasValue(value) || value.length !== 11 || !/\d{11}/.test(value));
  },
  validCPFValue(value: string): boolean {
    /** Calcula o primeiro ou o segundo dígito verificador de um CPF
     * @param cpfSliced 9 primeiros dígitos (p/ calcular o primeiro dígito verificador)
     * ou 9 primeiros dígitos concatenado com o primeiro dígito verificador para calcular
     * o segundo.
     * @return Dígito verificador, primeiro ou segundo, dependendo da cadeia de entrada
     */
    const calcDigitChecker = (cpfSliced: string): number => {
      const startRegressionNumber = cpfSliced.length + 1;
      const sum = Array(cpfSliced.length)
        .fill(0)
        .map((_, index) => +cpfSliced[index] * (startRegressionNumber - index))
        .reduce((prevDigit: number, currDigit: number) => prevDigit + currDigit);
      const restSumPerChecker2 = sum % 11;
      return restSumPerChecker2 < 2 ? 0 : 11 - restSumPerChecker2;
    };

    const firstNine = value.substring(0, 9);
    const firstChecker = calcDigitChecker(firstNine);
    const secondChecker = calcDigitChecker(`${firstNine}${firstChecker}`);
    return value.substring(9, 11) === `${firstChecker}${secondChecker}`;
  },
  validEmail(email: string): boolean {
    return this.hasValue(email) && regexEmail.test(email);
  },
  validPhone(number: string): boolean {
    return this.hasValue(number) && regexPhone.test(number);
  },
  validNumber(number: string) {
    return this.hasValue(number) && regexNumber.test(number);
  }
};

export {validation};
