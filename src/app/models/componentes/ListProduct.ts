import {ETipoComponente} from '../../enum/ETipoComponente';
import {Produto} from '../Produto';
import {ISequencia} from '../../interfaces/ISequencia';
import {DataTests} from '../../../shared/dataTests';

export class ListProduct implements ISequencia<Produto> {

  public readonly id: number;
  public readonly tipo: ETipoComponente = ETipoComponente.SEQUENCIA_PRODUTO;
  public readonly titulo: string;
  public readonly itens: Produto[];

  constructor(id) {
    // TODO: Solicitar ao backend a sequencia de id atual
    this.id = id;
    this.itens = DataTests.produtos;
    this.titulo = 'TOP Produtos mais vendidos na semana';
  }

  get tamanho() {
    return !!this.itens ? this.itens.length : 0;
  }
}
