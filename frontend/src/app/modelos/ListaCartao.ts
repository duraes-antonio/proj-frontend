import {IComponente} from "../interfaces/IComponente";
import {ETipoComponente} from "../enum/ETipoComponente";
import {Cartao} from "./Cartao";

export class ListaCartao implements IComponente {

  public readonly id: number;
  public readonly tipo: ETipoComponente = ETipoComponente.LISTA_CARTAO;
  public cartoes: Array<Cartao>;
  public readonly qtdCartoes: number;

  constructor(id) {
    //TODO: Solicitar ao backend a sequencia de id atual
    this.cartoes = this.obterCartoesMock();
    this.qtdCartoes = this.cartoes.length;
  }

  //TODO: Substituir pelos produtos recebidos do BACKEND
  private obterCartoesMock(): Array<Cartao> {
    let cartoes = new Array<Cartao>();
    cartoes.push(
      new Cartao(
      "../../assets/card-1.jpeg",
      "")
    );

    cartoes.push(
      new Cartao(
      "../../assets/card-2.jpeg",
      "")
    );

    cartoes.push(
      new Cartao(
      "../../assets/card-3.jpeg",
      "")
    );

    return cartoes;
  }
}