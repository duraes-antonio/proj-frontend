export class Cartao {

  public readonly titulo?: string;
  public readonly descricao?: string;
  public readonly botaoTitulo?: string;
  public readonly urlAcao?: string;
  public readonly urlImagem?: string;
  private readonly id: number;

  constructor(
    urlImagem: string, urlAcao: string, titulo?: string,
    descricao?: string, btnTitulo?: string
  ) {
    this.urlImagem = urlImagem;
    this.urlAcao = urlAcao;

    this.titulo = titulo;
    this.descricao = descricao;
    this.botaoTitulo = btnTitulo;
  }

}
