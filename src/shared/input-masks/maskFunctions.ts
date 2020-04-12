export const masks = {
  cep(value: string): string {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{5})(\d)/, '$1-$2')
      .replace(/(-\d{3})\d+?$/, '$1');
  },
  cpf(value: string): string {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{2})/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1');
  },
  numberUnsigned(value: string): string {
    return (value === undefined || value === null)
      ? ''
      : value
        .toString()
        .replace(',', '.')
        .replace(/[^.\d]/g, '');
  },
  numberInteger(value: string): string {
    return (value === undefined || value === null)
      ? ''
      : value
        .toString()
        .replace(/D/g, '.');
  },
  phone(value: string): string {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{4})(\d)/, '$1-$2')
      .replace(/(\d{4})-(\d)(\d{4})/, '$1$2-$3')
      .replace(/(-\d{4})\d+?$/, '$1');
  },
  valueOrMin(value: string | number, minVal: number): number {
    const valNum = +this.numberUnsigned(value.toString());
    return Math.max(valNum, minVal);
  },
  valueOrMax(value: string | number, maxVal: number): number {
    const valNum = +this.numberUnsigned(value.toString());
    return Math.min(valNum, maxVal);
  }
};
