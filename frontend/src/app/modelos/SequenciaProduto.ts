import {IComponente} from "../interfaces/IComponente";
import {ETipoComponente} from "../enum/ETipoComponente";
import {Produto} from "./Produto";

export class SequenciaProduto implements IComponente {

  public readonly id: number;
  public readonly tipo: ETipoComponente = ETipoComponente.SEQUENCIA_PRODUTO;
  public produtos: Array<Produto>;
  public readonly qtdProdutos: number;

  constructor(id) {
    //TODO: Solicitar ao backend a sequencia de id atual
    this.produtos = this.obterProdutosMock();
    this.qtdProdutos = this.produtos.length;
  }

  //TODO: Substituir pelos produtos recebidos do BACKEND
  private obterProdutosMock(): Array<Produto> {

    function obterPrecoRandom(): number {
      return Math.random() * 1000;
    }

    let produtos = new Array<Produto>();

    produtos.push(
      new Produto(
        "https://vignette.wikia.nocookie.net/yugioh/images/9/96/DP1-BoosterEN.jpg/revision/latest?cb=20080922232644",
        "Pack de Cards - Comum", obterPrecoRandom(), false)
    );

    produtos.push(
      new Produto(
        "https://vignette.wikia.nocookie.net/yugioh/images/a/ac/DP2-BoosterEN.jpg/revision/latest?cb=20061218005456",
        "Pack de Cards - Comum", obterPrecoRandom(), false)
    );

    produtos.push(
      new Produto(
        "https://vignette.wikia.nocookie.net/yugioh/images/2/24/SP17-BoosterEN.png/revision/latest/scale-to-width-down/282?cb=20170125212154",
        "Pack de Cards - Comum",
        obterPrecoRandom(), false)
    );

    produtos.push(
      new Produto(
        "https://vignette.wikia.nocookie.net/yugioh/images/3/3d/LED4-BoosterEN.png/revision/latest?cb=20190110075036",
        "Pack de Cards - Comum", obterPrecoRandom(), false)
    );

    produtos.push(
      new Produto(
        "https://vignette.wikia.nocookie.net/yugioh/images/2/26/HA05-BoosterFR.png/revision/latest?cb=20160902200711",
        "Pack 'Hidden Arsenal 5: Steelswarm Invasion' - Raro", obterPrecoRandom(), false)
    );
    //
    // produtos.push(
    //   new Produto(
    //     "https://vignette.wikia.nocookie.net/yugioh/images/3/3d/LED4-BoosterEN.png/revision/latest?cb=20190110075036",
    //     "Pack de Cards - Comum", obterPrecoRandom(), false)
    // );
    //
    // produtos.push(
    //   new Produto(
    //     "https://vignette.wikia.nocookie.net/yugioh/images/2/26/HA05-BoosterFR.png/revision/latest?cb=20160902200711",
    //     "Pack 'Hidden Arsenal 5: Steelswarm Invasion' - Raro", obterPrecoRandom(), false)
    // );
    return produtos;
  }
}
