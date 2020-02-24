import {ETipoComponente} from '../../enum/ETipoComponente';
import {Loja} from '../Loja';
import {DataTests} from '../../../shared/dataTests';

export class ListMarket {

  public readonly id: number;
  public readonly tipo: ETipoComponente = ETipoComponente.SEQUENCIA_LOJA;
  public readonly titulo: string;
  public readonly itens: Loja[];

  constructor(id) {
    // TODO: Solicitar ao backend a sequencia de id atual
    this.id = id;
    this.itens = DataTests.lojasParceiras;
    this.titulo = 'Lojas parceiras e recomendadas';
  }
}
