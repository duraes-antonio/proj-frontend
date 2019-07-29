import {IComponente} from "../interfaces/IComponente";
import {ETipoComponente} from "../enum/ETipoComponente";

export class Cartao  implements IComponente {

  public readonly tipo: ETipoComponente = ETipoComponente.CARTAO;

  private readonly id: number;

  public readonly titulo?: string;
  public readonly descricao?: string;

  public readonly botaoTitulo?: string;
  public readonly urlAcao?: string;

  public readonly urlImagem?: string;

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
