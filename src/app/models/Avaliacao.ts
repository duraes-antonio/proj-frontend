export class Avaliacao {
  public readonly id: number;
  public readonly idProduto: number;
  public readonly comentario: string;
  public readonly data: Date;
  public readonly nota: number;
  public readonly resumo: string;

  public readonly avaliadorNome: string;
  public readonly avaliadorUrlAvatar: string;

  constructor(
    nota: number, resumo: string, comentario: string, avaliadorNome: string,
    avaliadorUrlAvatar: string, id?: number, data?: Date) {
    this.comentario = comentario;
    this.data = data;
    this.nota = nota;
    this.resumo = resumo;

    this.avaliadorNome = avaliadorNome;
    this.avaliadorUrlAvatar = avaliadorUrlAvatar;
  }
}
