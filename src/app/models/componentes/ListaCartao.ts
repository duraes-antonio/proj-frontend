import {ETipoComponente} from '../../enum/ETipoComponente';
import {Cartao} from '../Cartao';
import {ISequencia} from '../../interfaces/ISequencia';

export class ListaCartao implements ISequencia<Cartao> {

  public readonly titulo: string;
  public readonly id: number;
  public readonly tipo: ETipoComponente = ETipoComponente.LISTA_CARTAO;
  public readonly itens: Array<Cartao>;

  constructor(id) {
    // TODO: Solicitar ao backend a sequencia de id atual
    this.itens = ListaCartao.obterCartoesMock();
    this.titulo = 'Seções especiais separadas para você!';
  }

  get tamanho(): number {
    return !!this.itens ? this.itens.length : 0;
  }

  // TODO: Substituir pelos produtos recebidos do BACKEND
  private static obterCartoesMock(): Array<Cartao> {
    const cartoes = new Array<Cartao>();
    cartoes.push(
      new Cartao(
        '../../assets/card-1.jpeg',
        '')
    );

    cartoes.push(
      new Cartao(
        '../../assets/card-2.jpeg',
        '')
    );

    cartoes.push(
      new Cartao(
        '../../assets/card-3.jpeg',
        '')
    );

    return cartoes;
  }
}
