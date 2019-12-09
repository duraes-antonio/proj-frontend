import {Produto} from '../modelos/Produto';

export class DadosTeste {

  public static readonly produtos = [
    new Produto(
      'https://images-na.ssl-images-amazon.com/images/I/717MHGTzgbL._SY606_.jpg',
      'Funk POP - Yugi',
      DadosTeste.obterPrecoRandom(), false, 0
    ),
    new Produto(
      'https://www.extra-imagens.com.br/brinquedos/Jogos/jogosdeCartas/13037927/967860280/yugioh-booster-duelist-pack-yugi-13037927.jpg',
      'Yugioh Booster Duelist Pack',
      DadosTeste.obterPrecoRandom(), true, DadosTeste.sortearValorDesc()
    ),
    new Produto(
      'https://http2.mlstatic.com/yu-gi-oh-booster-pack-premiere-ouro-gold-infinito--D_NQ_NP_608911-MLB20653779275_042016-F.webp',
      'Yu-gi-oh! - Booster Pack Première Ouro Gold Infinito',
      DadosTeste.obterPrecoRandom(), false, 0
    ),
    new Produto(
      'https://images-na.ssl-images-amazon.com/images/I/81R6LIH-%2B2L._SL1320_.jpg',
      'Yu-Gi-Oh: Duel Power Box- 6 Rare Cards & Booster Pack, Multicolor',
      DadosTeste.obterPrecoRandom(), false, 0
    ),
    new Produto(
      'https://vignette.wikia.nocookie.net/yugioh/images/9/96/DP1-BoosterEN.jpg/revision/latest?cb=20080922232644',
      'Pack de Cards - Comum',
      DadosTeste.obterPrecoRandom(), true, DadosTeste.sortearValorDesc()
    ),
    new Produto(
      'https://vignette.wikia.nocookie.net/yugioh/images/a/ac/DP2-BoosterEN.jpg/revision/latest?cb=20061218005456',
      'Pack de Cards - Comum',
      DadosTeste.obterPrecoRandom(), true, DadosTeste.sortearValorDesc()
    ),
    new Produto(
      'https://vignette.wikia.nocookie.net/yugioh/images/2/24/SP17-BoosterEN.png/revision/latest/scale-to-width-down/282?cb=20170125212154',
      'Pack de Cards - Comum',
      DadosTeste.obterPrecoRandom(), false, DadosTeste.sortearValorDesc()
    ),
    new Produto(
      'https://vignette.wikia.nocookie.net/yugioh/images/3/3d/LED4-BoosterEN.png/revision/latest?cb=20190110075036',
      'Pack de Cards - Comum',
      DadosTeste.obterPrecoRandom(), true, DadosTeste.sortearValorDesc()
    ),
    new Produto(
      'https://vignette.wikia.nocookie.net/yugioh/images/2/26/HA05-BoosterFR.png/revision/latest?cb=20160902200711',
      'Pack \'Hidden Arsenal 5: Steelswarm Invasion\' - Raro',
      DadosTeste.obterPrecoRandom(), false, DadosTeste.sortearValorDesc()
    ),

    new Produto(
      'https://vignette.wikia.nocookie.net/yugioh/images/9/96/DP1-BoosterEN.jpg/revision/latest?cb=20080922232644',
      'Pack de Cards - Comum',
      DadosTeste.obterPrecoRandom(), true, DadosTeste.sortearValorDesc()
    ),
    new Produto(
      'https://vignette.wikia.nocookie.net/yugioh/images/a/ac/DP2-BoosterEN.jpg/revision/latest?cb=20061218005456',
      'Pack de Cards - Comum',
      DadosTeste.obterPrecoRandom(), true, DadosTeste.sortearValorDesc()
    ),

    new Produto(
      'https://vignette.wikia.nocookie.net/yugioh/images/2/24/SP17-BoosterEN.png/revision/latest/scale-to-width-down/282?cb=20170125212154',
      'Pack de Cards - Comum',
      DadosTeste.obterPrecoRandom(), false, DadosTeste.sortearValorDesc()
    )
  ];

  private static obterPrecoRandom(): number {
    return Math.random() * 1000;
  }

  private static sortearValorDesc(): number {
    return Math.round(Math.random() * 100);
  }
}
