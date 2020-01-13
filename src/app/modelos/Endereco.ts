export class Endereco {
  public readonly logradouro: string;
  public readonly numero: number;
  public readonly cep: string;
  public readonly bairro: string;
  public readonly cidade: string;
  public readonly estado: string;

  constructor(
    numero: number, cep: string, logradouro: string, bairro: string,
    cidade: string, estado: string) {
    this.numero = numero;
    this.cep = cep;
    this.logradouro = logradouro;
    this.bairro = bairro;
    this.cidade = cidade;
    this.estado = estado;
  }
}
