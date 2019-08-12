import {ETipoComponente} from '../../enum/ETipoComponente';
import {Produto} from '../Produto';
import {ISequencia} from '../../interfaces/ISequencia';

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
    this.itens = this.obterProdutosMock();
    this.titulo = 'TOP Produtos mais vendidos na semana';
  }

  // TODO: Substituir pelos produtos recebidos do BACKEND
  private obterProdutosMock(): Array<Produto> {

    function obterPrecoRandom(): number {
      return Math.random() * 1000;
    }

    function sortearValorDesc(): number {
      return Math.round(Math.random() * 100);
    }

    const produtos = new Array<Produto>();

    produtos.push(
      new Produto(
        'https://vignette.wikia.nocookie.net/yugioh/images/9/96/DP1-BoosterEN.jpg/revision/latest?cb=20080922232644',
        'Pack de Cards - Comum',
        obterPrecoRandom(),
        true,
        sortearValorDesc())
    );

    produtos.push(
      new Produto(
        'https://vignette.wikia.nocookie.net/yugioh/images/a/ac/DP2-BoosterEN.jpg/revision/latest?cb=20061218005456',
        'Pack de Cards - Comum',
        obterPrecoRandom(),
        true,
        sortearValorDesc())
    );

    produtos.push(
      new Produto(
        'https://vignette.wikia.nocookie.net/yugioh/images/2/24/SP17-BoosterEN.png/revision/latest/scale-to-width-down/282?cb=20170125212154',
        'Pack de Cards - Comum',
        obterPrecoRandom(), false)
    );

    produtos.push(
      new Produto(
        'https://vignette.wikia.nocookie.net/yugioh/images/3/3d/LED4-BoosterEN.png/revision/latest?cb=20190110075036',
        'Pack de Cards - Comum',
        obterPrecoRandom(),
        true,
        sortearValorDesc())
    );

    produtos.push(
      new Produto(
        'https://vignette.wikia.nocookie.net/yugioh/images/2/26/HA05-BoosterFR.png/revision/latest?cb=20160902200711',
        'Pack \'Hidden Arsenal 5: Steelswarm Invasion\' - Raro', obterPrecoRandom(), false)
    );

    return produtos;
  }
}
