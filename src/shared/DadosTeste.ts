import {Produto} from '../app/modelos/Produto';
import {Categoria} from '../app/modelos/Categoria';

export class DadosTeste {

  public static readonly categorias = [
    new Categoria('Acessórios', 1),
    new Categoria('Cards', 2),
    new Categoria('Colecionáveis', 3),
    new Categoria('Pacote de Cards', 4),
    new Categoria('Vestuário', 5)
  ];
  public static readonly produtos = [
    new Produto(
      'https://images-na.ssl-images-amazon.com/images/I/717MHGTzgbL._SY606_.jpg',
      'Funk POP - Yugi',
      // tslint:disable-next-line:max-line-length
      'Boneco Funko Pop Yu-gi-oh - Yami Yugi 387, é o mais novo título popular mundialmente. Explore este mundo devastado e repleto de perigos. Boneco Funko Pop Yu-gi-oh - Yami Yugi 387 você é livre em todas as suas decisões podendo pender tanto para o mal quanto para o bem, ou manter-se neutro. Além disso é possível criar e gerar uma energia a mais.',
      DadosTeste.obterPrecoRandom(), false, 10, [DadosTeste.categorias[2]],
      true, 1, 150
    ),
    new Produto(
      'https://www.extra-imagens.com.br/brinquedos/Jogos/jogosdeCartas/13037927/967860280/yugioh-booster-duelist-pack-yugi-13037927.jpg',
      'Yugioh Booster Duelist Pack',
      // tslint:disable-next-line:max-line-length
      'Duelist Pack Yugi é um Pacote de Duelista no Yu-Gi-Oh! Essa Coleção possui Cartas usados por Yugi Muto. Contém novas artes para muitas cartas, incluindo "Dark Magician Girl", "Summoned Skull", "Dark Paladin" e "Polymerization".\n' +
      '\n' +
      'Este é o primeiro Pacote Duelista a ter cartões Ultimate Rare.\n',
      DadosTeste.obterPrecoRandom(), true, DadosTeste.sortearValorDesc(), [DadosTeste.categorias[3]],
      false, 2
    ),
    new Produto(
      'https://http2.mlstatic.com/yu-gi-oh-booster-pack-premiere-ouro-gold-infinito--D_NQ_NP_608911-MLB20653779275_042016-F.webp',
      'Yu-gi-oh! - Booster Pack Première Ouro Gold Infinito',
      // tslint:disable-next-line:max-line-length
      'Booster Yu-Gi-Oh! - Première Ouro em Português - Decks/Boosters contém 15 cartas em cada pack, 6 serão Secretas Douradas Raras e as outras 9 serão reimpressões das Douradas Raras mais populares de lançamentos passados ou cartas que aparecem como Dourada Raras pela primeira vez. Antes as Douradas Raras só estavam disponíveis através de canais limitados, mas desta vez Première Ouro vai estar disponível para todos! Em português!',
      DadosTeste.obterPrecoRandom(), false, 0, [DadosTeste.categorias[3]],
      false, 3
    ),
    new Produto(
      'https://images-na.ssl-images-amazon.com/images/I/81R6LIH-%2B2L._SL1320_.jpg',
      'Yu-Gi-Oh: Duel Power Box- 6 Rare Cards & Booster Pack, Multicolor',
      '6 Duel Power booster packs, each with 5 Ultra Rare cards per pack\n' +
      // tslint:disable-next-line:max-line-length
      '6 new Ultra Rare variant art cards, showing off new art versions of the main monsters from each Yu-Gi-Oh! anime series (Dark Magician, Elemental HERO Neos, Stardust Dragon, Number 39: Utopia, Odd-Eyes Pendulum Dragon, and Decode Talker)\n' +
      '1 Gameboard.',
      DadosTeste.obterPrecoRandom(), false, 0, [DadosTeste.categorias[3]],
      true, 4
    ),
    new Produto(
      'https://vignette.wikia.nocookie.net/yugioh/images/9/96/DP1-BoosterEN.jpg/revision/latest?cb=20080922232644',
      'Pack de Cards - Comum', 'Sem descrição',
      DadosTeste.obterPrecoRandom(), true, DadosTeste.sortearValorDesc(), [DadosTeste.categorias[3]]
    ),
    new Produto(
      'https://vignette.wikia.nocookie.net/yugioh/images/a/ac/DP2-BoosterEN.jpg/revision/latest?cb=20061218005456',
      'Pack de Cards - Comum', 'Sem descrição',
      DadosTeste.obterPrecoRandom(), true, DadosTeste.sortearValorDesc(), [DadosTeste.categorias[3]]
    ),
    new Produto(
      'https://vignette.wikia.nocookie.net/yugioh/images/2/24/SP17-BoosterEN.png/revision/latest/scale-to-width-down/282?cb=20170125212154',
      'Pack de Cards - Comum', 'Sem descrição',
      DadosTeste.obterPrecoRandom(), true, DadosTeste.sortearValorDesc(), [DadosTeste.categorias[3]]
    ),
    new Produto(
      'https://vignette.wikia.nocookie.net/yugioh/images/3/3d/LED4-BoosterEN.png/revision/latest?cb=20190110075036',
      'Pack de Cards - Comum', 'Sem descrição',
      DadosTeste.obterPrecoRandom(), true, DadosTeste.sortearValorDesc(), [DadosTeste.categorias[3]]
    ),
    new Produto(
      'https://vignette.wikia.nocookie.net/yugioh/images/2/26/HA05-BoosterFR.png/revision/latest?cb=20160902200711',
      'Pack \'Hidden Arsenal 5: Steelswarm Invasion\' - Raro', 'Sem descrição',
      DadosTeste.obterPrecoRandom(), true, DadosTeste.sortearValorDesc(), [DadosTeste.categorias[3]]
    ),

    new Produto(
      'https://vignette.wikia.nocookie.net/yugioh/images/9/96/DP1-BoosterEN.jpg/revision/latest?cb=20080922232644',
      'Pack de Cards - Comum', 'Sem descrição',
      DadosTeste.obterPrecoRandom(), true, DadosTeste.sortearValorDesc(), [DadosTeste.categorias[3]]
    ),
    new Produto(
      // tslint:disable-next-line:max-line-length
      'https://www.fye.com/dw/image/v2/BBNF_PRD/on/demandware.static/-/Sites-fye-master/default/dw4ae005b4/fye/000/000000/fye.000000693186763441_0.jpg?sw=584',
      'Yu-Gi-Oh Blue Eyes T-Shirt', 'Sem descrição',
      DadosTeste.obterPrecoRandom(), true, DadosTeste.sortearValorDesc(), [DadosTeste.categorias[4]]
    ),

    new Produto(
      // tslint:disable-next-line:max-line-length
      'https://ae01.alicdn.com/kf/HTB1EnnrQVXXXXb4XXXXq6xXFXXXs/Nova-chegada-quente-yugioh-zexal-yuma-cosplay-link-corrente-colar-yu-gi-oh-pingente-de-metal.jpg',
      'Pingente de metal', 'Sem descrição',
      DadosTeste.obterPrecoRandom(), true, DadosTeste.sortearValorDesc(), [DadosTeste.categorias[0]]
    )
  ];


  private static obterPrecoRandom(): number {
    return Math.random() * 1000;
  }

  private static sortearValorDesc(): number {
    return Math.round(Math.random() * 100);
  }
}
