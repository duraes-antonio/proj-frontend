import {ETipoComponente} from '../../enum/ETipoComponente';
import {Produto} from '../Produto';
import {ISequencia} from '../../interfaces/ISequencia';
import {DadosTeste} from '../../shared/DadosTeste';

export class SequenciaProduto implements ISequencia<Produto> {

  public readonly id: number;
  public readonly tipo: ETipoComponente = ETipoComponente.SEQUENCIA_PRODUTO;
  public readonly titulo: string;
  public readonly itens: Array<Produto>;

  get tamanho() {
    return !!this.itens ? this.itens.length : 0;
  }

  constructor(id) {
    // TODO: Solicitar ao backend a sequencia de id atual
    this.id = id;
    this.itens = DadosTeste.produtos;
    this.titulo = 'TOP Produtos mais vendidos na semana';
  }
}
