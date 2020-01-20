const masks = {
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
  }
};

export {masks};
