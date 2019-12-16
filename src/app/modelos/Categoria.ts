export class Categoria {
  public readonly id: number;
  public readonly nome: string;

  constructor(nome: string, id?: number) {
    this.nome = nome;
    this.id = id;
  }
}
