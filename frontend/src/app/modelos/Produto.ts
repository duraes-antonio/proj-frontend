export class Produto {

  public readonly id: number;
  public readonly urlImagem: string;
  public readonly titulo: string;
  public readonly preco: number;

  public readonly emPromocao: boolean;
  public readonly porcentDesc: number;

  constructor(
    urlImg: string, titulo: string, precoVenda: number, emPromocao: boolean,
    porcentDesc?: number) {
    this.urlImagem = urlImg;
    this.titulo = titulo;
    this.preco = precoVenda;
    this.emPromocao = emPromocao;
    this.porcentDesc = porcentDesc;
  }
}
