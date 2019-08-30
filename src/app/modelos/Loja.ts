export class Loja {

  public readonly id: number;
  public readonly urlImagem: string;
  public readonly urlImgLogo: string;
  public readonly nome: string;
  public readonly link: string;

  constructor(
    urlImgFundo: string, urlImgLogo: string, nome: string, link: string) {
    this.urlImagem = urlImgFundo;
    this.urlImgLogo = urlImgLogo;
    this.nome = nome;
    this.link = link;
  }
}
