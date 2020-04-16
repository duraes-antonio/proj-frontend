'use strict';
import {Product} from '../app/models/product';
import {Category} from '../app/models/category';
import {Review} from '../app/models/review';
import {Address} from '../app/models/address';
import {DeliveryOption} from '../app/models/delivery-option';
import {randomBoolean, randomFloat, randomInt, util} from './util';
import {User} from '../app/models/user';
import {NotificationModel} from '../app/models/notification';
import {Slide} from '../app/models/componentes/slide';
import {Market} from '../app/models/market';
import {Card} from '../app/models/card';
import {ListProduct} from '../app/models/componentes/list-product';
import {ListMarket} from '../app/models/componentes/list-market';
import {Order} from '../app/models/order';
import {EStateOrder} from '../app/enum/state-order';
import {ERole} from '../app/enum/roles';
import {ListSlide} from '../app/models/componentes/slider';
import {ListLink} from '../app/models/componentes/list-link';
import {routesFrontend} from './constants/routesFrontend';

export class DataTests {
  private static itemOrderId = 0;
  private static marketId = 0;
  private static notificId = 0;
  private static orderId = 0;
  private static productId = 0;

  static readonly addresses: Address[] = [
    {
      number: 38,
      zipCode: '29065-390',
      street: 'Rua Emília Mazoco Keijok',
      neighborhood: 'Mata da Praia',
      city: 'Vitória',
      state: 'ES',
      id: '1',
      userId: '1'
    },
    {
      number: 783,
      zipCode: '29300-120',
      street: 'Rua Dona Joanna',
      neighborhood: 'Centro',
      city: 'Cachoeiro de Itapemirim',
      state: 'ES',
      id: '2',
      userId: '2',
    },
    {
      number: 231,
      zipCode: '91910-670',
      street: 'Avenida Flor de Maracá',
      neighborhood: 'Cristal',
      city: 'Porto Alegre',
      state: 'RS',
      id: '3',
      userId: '3'
    },
    {
      number: 21,
      zipCode: '69316-027',
      street: 'Rua Estrela do Norte',
      neighborhood: 'Raiar do Sol',
      city: 'Boa Vista',
      state: 'RO',
      id: '4',
      userId: '4'
    },
    {
      number: 445,
      zipCode: '59628-070',
      street: 'Rua Lavoisier Maia',
      neighborhood: 'Alto de São Manoel',
      city: 'Mossoró',
      state: 'RN',
      id: '5',
      userId: '5'
    }
  ];
  static readonly cards: Card[] = [
    {id: '1', urlImage: '../../assets/card-1.jpeg', title: '', urlAction: ''},
    {id: '2', urlImage: '../../assets/card-2.jpeg', title: '', urlAction: ''},
    {id: '3', urlImage: '../../assets/card-3.jpeg', title: '', urlAction: ''},
  ];
  static readonly categories: Category[] = [
    {name: 'Acessórios', id: '1'},
    {name: 'Cards', id: '2'},
    {name: 'Colecionáveis', id: '3'},
    {name: 'Pacote de Cards', id: '4'},
    {name: 'Vestuário', id: '5'},
  ];
  static readonly deliveryOptions: DeliveryOption[] = [
    {cost: 14.25, timeDays: 12},
    {cost: DataTests.obterPrecoRandom(), timeDays: 14},
    {cost: DataTests.obterPrecoRandom(), timeDays: 5}
  ];
  static readonly notifications: NotificationModel[] = Array
    .from({length: 20}, () => DataTests.notificRandom());
  static readonly products: Product[] = [
    DataTests.productRandom(
      'Funk POP - Yugi',
      // tslint:disable-next-line:max-line-length
      'Boneco Funko Pop Yu-gi-oh - Yami Yugi 387, é o mais novo título popular mundialmente. Explore este mundo devastado e repleto de perigos. Boneco Funko Pop Yu-gi-oh - Yami Yugi 387 você é livre em todas as suas decisões podendo pender tanto para o mal quanto para o bem, ou manter-se neutro. Além disso é possível criar e gerar uma energia a mais.',
      'https://images-na.ssl-images-amazon.com/images/I/717MHGTzgbL._SY606_.jpg'
    ),
    DataTests.productRandom(
      'Yugioh Booster Duelist Pack',
      // tslint:disable-next-line:max-line-length
      'Duelist Pack Yugi é um Pacote de Duelista no Yu-Gi-Oh! Essa Coleção possui Cartas usados por Yugi Muto. Contém novas artes para muitas cartas, incluindo "Dark Magician Girl", "Summoned Skull", "Dark Paladin" e "Polymerization".\n',
      'https://www.extra-imagens.com.br/brinquedos/Jogos/jogosdeCartas/13037927/967860280/yugioh-booster-duelist-pack-yugi-13037927.jpg',
    ),
    DataTests.productRandom(
      'Legendary Decks 1 E 2 - Decks Legendários Em Pt Em 12 X',
      // tslint:disable-next-line:max-line-length
      'NESTE ANÚNCIO VOCÊ ESTA LEVANDO 2 LEGENDARYS EM 12 X SEM JUROS COM FRETE GRÁTIS\n1 X LEGENDARY DECKS 1\n1 X LEGENDARY DECKS 2\nTODOS SELADOS 100% ORIGINAIS EM PORTUGUÊS\nCADA LEGENDARY CONTÉM 3 DECKS DE 40 CARDS CADA\nUM TOTAL DE 120 CARDS POR LEGENDARY.\nLEGENDARY DECKS 1 CONTÉM OS DECKS: Exodia , Battle City e Gadget\nLEGENDARY DECKS 2 CONTÉM OS DECKS: Yugi, Kaiba e Joey.',
      'https://http2.mlstatic.com/legendary-decks-1-e-2-decks-legendarios-em-pt-em-12-x-D_NQ_NP_723993-MLB31177348065_062019-F.webp'
    ),
    DataTests.productRandom(
      'Booster Box De Battle Of Legends Hero\'s Revenge Em Pt Em 12x',
      // tslint:disable-next-line:max-line-length
      `NESSE ANUNCIO VOCÊ ESTA LEVANDO 1x BOX de Batalha das Lendas Vingança do Herói 100% ORIGINAL EM PORTUGUÊS EM 12x S/ Juros\n\nEntre as 93 estampas metalizadas dessa coleção, você poderá encontrar estampas dos antigos mangás e animes de Yu-Gi-Oh! impressas pela primeira vez em Yu-Gi-Oh! ESTAMPAS ILUSTRADAS, novos Monstros Link, suportes poderosos para os torneios e mais! Confira uma prévia das novidades que aguardam os Duelistas:\n• O Número 93: Kaiser Utopia, originalmente disponível apenas para aqueles que atingiram o auge da competição, faz sua estreia pública! Muitas outras surpresas esperam pelos fãs dos monstros "Número" em Batalha das Lendas: Vingança do Herói.\n• Mais monstros "HERÓIs da Visão" do anime e mangá de Yu-Gi-Oh! GX, incluindo novas estampas relacionadas aos "HERÓIs", como Vyon, o HERÓI da Visão.\n• Monstros Link inéditos para diversos temas de Decks, como PSÍ-Armação, Armadilhatrix, Soldado do Lustro Negro e mais.\n• Estampas cobiçadas do cenário competitivo, como Dragão Callibrespada e Força Celeste - Mobilizar - Engajar!\n• Estampas populares do cenário competitivo receberão suas versões metalizadas pela primeira vez, incluindo Dinolutador Pancratops, Artefato Lança do Destino e Limitar Invocação.\n• Cada pacote contém 5 estampas, sendo 4 Ultra Raras e 1 Rara Secreta.\n• Cada caixa contém 24 pacotes.`,
      'https://http2.mlstatic.com/booster-box-de-battle-of-legends-heros-revenge-em-pt-em-12x-D_NQ_NP_628017-MLB32085314597_092019-O.webp'
    ),
    DataTests.productRandom(
      'Yugioh Card Box Tempestade Raging Tempest Special Português',
      // tslint:disable-next-line:max-line-length
      'YUGIOH BOX BOOSTER TEMPESTADE FURIOSA EDIÇÃO ESPECIAL\nA Tempestade Furiosa é uma coleção recheada de novas e excelentes estampas para uma grande variedade de temas, incluindo os ESPIRÕES, Engrenagens Anciões, Subterrores, Cristrons, Sombranecos e muitos outros.A Tempestade Furiosa também introduziu muitas estampas que podem ser usadas de forma independente em diferentes tipos de Decks, desde uma nova estampa da leva dos poderosos “Vírus” – que começou com o Vírus Esmaga-Card do Kaiba – até um monstro gigantesco capaz de redefinir a própria realidade! Além dessa grande quantidade de suportes para os temas já existentes, a Tempestade Furiosa apresentou três temas inéditos!\n\nConteúdo:\n\nCada Box Tempestade Furiosa Edição Especial contém:\n\n- 10 unidade de Tempestade Furiosa Edição Especial com 3 Booster Cada (9 Cartas por booster)\n- 1 de 2 Estampas Super Raras variantes\n- 1 de 2 Estampas Metalizadas de uma coleção que ainda será lançada no Outono de 2017\n- Total 290 Cartas\n\n- Produto em Português\n- Fabricado por Konami\n- Novo Lacrado e Original\n',
      'https://http2.mlstatic.com/yugioh-card-box-tempestade-raging-tempest-special-portugus-D_NQ_NP_768667-MLB31854765242_082019-F.webp'
    ),
    DataTests.productRandom(
      'Funko Pop! - Yu-gi-oh! - Mago Negro - Dark Magician #595',
      // tslint:disable-next-line:max-line-length
      'Tamanho aproximado de 8cms de Altura, Feito de Vinil.\nProduto Novo, Fechado na Embalagem.\nORIGINAL FUNKO.\n\n\nSe o pagamento for confirmado até as 12h de Segunda a Sexta, será postado no mesmo dia útil. Caso contrário, será postado no próximo dia útil.\nPostamos de Segunda a Sexta, exceto Feriados.\nApós o envio, informaremos o código de rastreamento por mensagem.',
      'https://http2.mlstatic.com/funko-pop-yu-gi-oh-mago-negro-dark-magician-595-D_NQ_NP_785712-MLB32083660535_092019-F.webp'
    ),
    DataTests.productRandom(
      'Boneco Yu-gi-oh! Rei Caveira Totaku 22 Summoned Skull',
      // tslint:disable-next-line:max-line-length
      'Yu-Gi-Oh! é uma série de mangá sobre jogo escrita e ilustrada por Kazuki Takahashi. A série foi originalmente publicada pela editora Shueisha na revista Weekly Shonen Jump entre 1996 e 2004.\nFigures altamente detalhadas de 10cm.',
      'https://http2.mlstatic.com/boneco-yu-gi-oh-rei-caveira-totaku-22-summoned-skull-D_NQ_NP_824828-MLB31711205912_082019-F.webp'
    ),
    DataTests.productRandom(
      'Funko Pop! Animation - Yu-gi-oh! - Dark Magician Girl #390',
      // tslint:disable-next-line:max-line-length
      'Funko Pop! Animation - Yu-gi-oh! - Dark Magician Girl #390\n\nCriado pela Funko este boneco colecionável, com aspecto agradável em seus vários modelos e franquias, os Pops! viraram uma paixão nacional.\nTenha seu personagem favorito com você, aquele sentimento de nostalgia, que te remete a uma época boa de sua vida, que te traga boas lembranças, ou pelo simples fato de estar adorando a nova série, os novos filmes. Funko Pop! esta ai para todos os gostos, e tudo isso com os melhores preços dos colecionáveis !!\n\n\nDetalhes\nConteúdo: Figura não articulada Tamanho: Aprox. 12cm de altura Material do Produto: Vinil Fabricante: Funko\nProdutos adquiridos com revendedora autorizada pela Funko.\n',
      'https://http2.mlstatic.com/funko-pop-animation-yu-gi-oh-dark-magician-girl-390-D_NQ_NP_679975-MLB31070299689_062019-F.webp'
    ),
    DataTests.productRandom(
      'Funko Pop! Yu-gi-oh! - Seto Kaiba 388',
      // tslint:disable-next-line:max-line-length
      'Boneco em vinyl aprox. 10cm.\nProduto novo na caixa.\nPronta entrega.\nQualquer dúvida, estamos a disposição. Antes de confirmar a compra tire todas as suas dúvidas.',
      'https://http2.mlstatic.com/funko-pop-yu-gi-oh-seto-kaiba-388-D_NQ_NP_812498-MLB31067667582_062019-F.webp'
    ),
    DataTests.productRandom(
      'Yu-gi-oh! Deck Inicial - Decifrador De Códigos',
      // tslint:disable-next-line:max-line-length
      'DECK INICIAL 2018 DECIFRADOR DE CÓDIGOS YUGIOH\nO Deck Inicial Decifrador de Códigos introduz os conceitos básicos dos Duelos através de cartas poderosas e fáceis de entender. Depois de aprender os fundamentos da Invocação-Link com os Monstros Link “Codificar Transmissor”, os Duelistas iniciantes podem usar este Deck Inicial como base para criar suas próprias estratégias com os monstros Ciberso e “Codificar Transmissor”. Monstros Link de muitos lançamentos diferentes incluindo o Deck Estrutural Link Ciberso e Força Extrema.\n\n\nPara garantir que os Duelistas tenham as ferramentas necessárias para aprimorar essas técnicas básicas e levar a invocação Link ao próximo nível, o Deck Inicial Decifrador de Códigos inclui adições poderosas como Linkuriboh, anteriormente inéditas em territórios da América Latina e Europa!\n\n\nMonstros Link é a mais nova adição ao Yu-Gi-Oh! Eles oferecem aos Duelistas uma saída nova para demonstrar suas habilidades, dominando não apenas como eles jogam suas cartas, mas também onde eles jogam. Estes novos monstros tornaram-se parte integrante do Duelo e o Deck Inicial Decifrador de Códigos contém 5 Monstros Link para dar aos novos Duelistas uma vantagem na competição.\n\n\nDeck Inicial Decifrador de Códigos contém 45 Cartas.\n\n\nCONTEÚDO\n\n\n- 40 Cartas Comuns\n- 3 Cartas Super Raras\n- 2 Cartas Ultra Raras\n- 1 Guia do Iniciante\n- 1 Campo de Duelo / Guia de Duelos em Dupla Face\n\n\nESPECIFICAÇÃO\n\n\n- Edição em Português\n- Fabricado por Konami\n- Novo Lacrado e Original',
      'https://http2.mlstatic.com/yu-gi-oh-deck-inicial-decifrador-de-codigos-D_NQ_NP_775588-MLB31047940699_062019-F.webp'
    ),
    DataTests.productRandom(
      'Yugioh Deck Estrutural Horda Zumbi Zombie Horde Portugues',
      // tslint:disable-next-line:max-line-length
      'YUGIOH HORDA ZUMBI DECK ESTRUTURAL\n\nEstoque alimentos e bloqueie todas as entradas, a horda zumbi está chegando! O Deck Estrutural: Horda Zumbi é construído em torno do poder abrangente da Magia de Campo Mundo Zumbi para criar Duelos onde os Zumbis reinam supremos! O monstro chefe deste Deck pode ser Invocado do Cemitério durante cada Fase de Apoio se houver uma Magia de Campo ativa. Sua segunda habilidade nega um efeito de monstro ou bane um monstro do campo ou Cemitério, mas funciona apenas quando um Zumbi usar seu efeito – assim, basta manter a Magia de Campo Mundo Zumbi ativa para que todos os monstros do campo e Cemitério sejam transformados em Zumbis!\n\nUm novo monstro de Nível 4 com ATK elevado garantirá que o seu Mundo Zumbi permaneça em campo, impedindo-o de ser escolhido como alvo ou destruído por efeitos de cards. Você também pode banir esse monstro do campo ou Cemitério para ativar a poderosa Magia de Campo Mundo Zumbi da sua mão ou Deck! Este Deck não é composto por um ou dois Zumbis, mas por uma horda inteira! Quer saber a parte mais assustadora dessa história? Os zumbis querem que você se junte à horda! Essa fome insaciável é representada por uma nova Magia que, além de se encaixar em qualquer Deck de Zumbi, recruta os monstros do oponente não uma, mas duas vezes! Desde que controle um Zumbi de Nível 5 ou superior, ela funciona como a clássica Mudança de Opinião, enquanto seu outro efeito permite que você embaralhe um Zumbi banido de volta ao Deck para Baixá-la no campo diretamente do Cemitério!\n\n2018 foi um ano incrível para os Decks de Zumbis graças às estratégias inéditas das coleções Salvadores das Trevas e Invocadores Ocultos. Mas não pense que acabou, o surto Zumbi se expandirá em proporções cada vez maiores no mundo dos Duelos com este novo Deck Estrutural! O Deck Estrutural: Horda Zumbi contém 41 estampas no Deck Principal e 1 estampa no Deck Adicional, totalizando 42 estampas\n\nCONTEÚDO\n\n- 37 Comuns\n- 3 Super Raras\n- 2 Ultra Raras\n- 1 Guia do Iniciante\n- 1 Campo de Duelo em Dupla Face\n\nESPECIFICAÇÃO\n​\n- Edição em Português\n- Fabricado por Konami\n- Novo Lacrado e Original\n\nLISTA DE CARTAS\n\nSR07-PT000 Tatsunecro Super Raro\nSR07-PT001 Rei da Condenação Balerdroch Ultra Raro\nSR07-PT002 Banshee do Necromundo Super Raro\nSR07-PT003 Florescer Brilhante Super Raro\nSR07-PT004 Kasha\nSR07-PT005 Dragão Zumbi de Olhos Vermelhos\nSR07-PT006 Mech Malévolo - Goku En\nSR07-PT007 Decomposição Interminável\nSR07-PT008 Paladino do Dragão Amaldiçoado\nSR07-PT009 Governante Imortal\nSR07-PT010 Mestre Zumbi\nSR07-PT011 Tristan, Cavaleiro do Submundo\nSR07-PT012 Mezuki\nSR07-PT013 Gozuki\nSR07-PT014 Shutendoji\nSR07-PT015 Tartaruga Pirâmide\nSR07-PT016 Goblin Zumbi\nSR07-PT017 Isolde, Belle do Submundo\nSR07-PT018 Shiranui Solitário\nSR07-PT019 Uni-Zumbi Comum\nSR07-PT020 Ácaro Marionete\nSR07-PT021 Besta do Faraó\nSR07-PT022 Fantasma Expiatório\nSR07-PT023 Necronizar Zumbi\nSR07-PT024 Luta pelo Poder Zumbi\nSR07-PT025 Mundo Zumbi\nSR07-PT026 Olho Esmagador\nSR07-PT027 Livro da Vida\nSR07-PT028 Chamado da Múmia\nSR07-PT029 Enterro Tolo\nSR07-PT030 Portão do Monstro\nSR07-PT031 Arrastado para a Cova \nSR07-PT032 Enterro de Outra Dimensão\nSR07-PT033 Carona\nSR07-PT034 Retorno dos Zumbis\nSR07-PT035 Santuário Assombrado\nSR07-PT036 Armadilha da Tumba Emperial\nSR07-PT037 Ninho do Agulheto\nSR07-PT038 Metavers\nSR07-PT039 Fragrância Anti-Magia\nSR07-PT040 Máscara da Restrição\nSR07-PT041 Necro Dragão Zumbi de Olhos Vermelhos Ultra Raro',
      'https://http2.mlstatic.com/yugioh-deck-estrutural-horda-zumbi-zombie-horde-portugues-D_NQ_NP_729471-MLB31075947276_062019-F.webp'
    ),
    DataTests.productRandom(
      'Yugioh Legacy Of The Duelist Link Evolution Switch Física',
      // tslint:disable-next-line:max-line-length
      'LEIA COM ATENÇÃO TODO O ANÚNCIO ANTES DE FINALIZAR A COMPRA!\n\n- Produto mídia física\n- Capinha de plástico (tradicional)\n- Produto original, novo e lacrado\n- Com nota fiscal\n- Postagem rápida! No máximo no próximo dia útil\n- Não enviamos via Carta Registrada\n\nYu-Gi-Oh! Legacy of the Duelist: Link Evolution! é um jogo de estratégia baseado na animação japonesa Yu-Gi-Oh. Construa seu deck com mais de 9000 cartas e lute contra os duelistas mais famosos do universo de Yu-Gi-Oh. Reviva a história da animação japonesa e recrie as batalhas contra seus personagens prediletos.\n\nExclusivo para o Nintendo Switch, construa seu deck com cartas icônicas da animação japonesa e batalhe contra os duelistas mais fortes do mundo virtual de Yu-Gi-Oh, ou jogue como vilões no modo Reverse Duels. Um jogo totalmente fiel e ótimo para os amantes de Yu-Gi-Oh.\n\nREQUISITOS\n- Nintendo Switch\n\nITENS INCLUSOS\n- Game Card\n- Encarte\n\n---------- INFORMAÇÕES IMPORTANTES ----------\n- Os pedidos serão enviados em até 1 dia útil após APROVADOS pelo MercadoPago, salvo exceções como instabilidades em sistemas fiscais e logísticos, grande fluxo de pedidos ocasionados por promoções, épocas comemorativas do ano e/ou lançamentos de produtos, ou devido a atrasos ocasionados por empresas terceirizadas (transportadoras, plataformas on-line, fornecedores etc.). Manteremos você informado em qualquer caso de atraso na postagem de sua encomenda.',
      'https://http2.mlstatic.com/yugioh-legacy-of-the-duelist-link-evolution-switch-fisica-D_NQ_NP_678452-MLB32735525624_112019-F.webp'
    ),
    DataTests.productRandom(
      'Yu-gi-oh! Forbidden Memories Português Patch Ps1',
      // tslint:disable-next-line:max-line-length
      'COMPATÍVEL COM:\nPS1 DESTRAVADO\nMIDIA FISICA\nFUNCIONA TAMBEM EM PLAYSTATION 2 QUE POSSUA RECUSSOS PARA PLAYSTATION 1\nTAMBEM FAZEMOS ELE NO OPL COM MEMORY CARD E PENDRIVE\nFRETE R$:10,00 POR CARTA REGISTRADA PARA TODO BRASIL\nACEITO MERCADO PAGO',
      'https://http2.mlstatic.com/yu-gi-oh-forbidden-memories-portugus-patch-ps1-D_NQ_NP_909906-MLB32086903379_092019-F.webp'
    )
  ];
  static readonly reviews: Review[] = [
    {
      rating: 1,
      title: 'Ótimo produto, gostei!',
      comment: 'A família adorou',
      userName: 'Jão Kleber dos Santos Silva',
      // tslint:disable-next-line:max-line-length
      userAvatarUrl: 'data:image/jpeg;base64,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',
      productId: '1',
      userId: '1',
      id: '1',
      date: new Date()
    },
    {
      rating: 5,
      title: 'Odiei, baixo custo benefício, espaçoso',
      comment: 'Tem quem queira',
      userName: 'Geovana da Silva',
      userAvatarUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcReENEL-dTjbniGpZYmx_68CyKxZ50WRpfWMi0RZWnFiBMh6amG',
      productId: '1',
      userId: '2',
      id: '2',
      date: new Date(2020, 1, 23)
    },
    {
      rating: 4,
      title: 'É, não é aquelas coisas',
      // tslint:disable-next-line:max-line-length
      comment: 'Vale a compra, mesmo que o empenho em analisar a consulta aos diversos militantes assume importantes posições no estabelecimento dos índices pretendidos.',
      userName: 'Marineide Santos',
      userAvatarUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTrYqJ7_7paHKrJNu1GlDpHNF3mXTb-4_aJzhOAt5SOaX6YvLBS',
      productId: '1',
      userId: '3',
      id: '3',
      date: new Date(2020, 1, 1)
    }
  ];
  static readonly slides: Slide[] = [
    {
      url: 'https://www.dvdplanetstore.pk/wp-content/uploads/2018/05/ti0CRprP9iSg9IDadTZ3TFnuczS.jpg',
      imageUrl: 'https://www.dvdplanetstore.pk/wp-content/uploads/2018/05/ti0CRprP9iSg9IDadTZ3TFnuczS.jpg',
      index: 1,
      title: 'Yu-Gi-Oh! Duel Links Promotional'
    },
    {
      url: 'https://vignette.wikia.nocookie.net/yugioh/images/e/ed/DOD-VideoGameEN.jpg/revision/latest?cb=20110710180208',
      imageUrl: 'https://vignette.wikia.nocookie.net/yugioh/images/e/ed/DOD-VideoGameEN.jpg/revision/latest?cb=20110710180208',
      index: 2,
      title: 'Yu-Gi-Oh! The Dawn of Destiny'
    },
    {
      url: '../../assets/slide-1.jpg',
      imageUrl: '../../assets/slide-1.jpg',
      index: 3,
      title: 'Deck: Dragão Branco'
    },
    {
      url: '../../assets/slide-2.jpg',
      imageUrl: '../../assets/slide-2.jpg',
      index: 4,
      title: 'Promoção de férias!'
    },
    {
      url: '../../assets/slide-3.jpg',
      imageUrl: '../../assets/slide-3.jpg',
      index: 5,
      title: 'Deck Inicial: Decifrador de código'
    },
  ];
  static readonly sliders: ListSlide[] = [
    {id: '1', readRole: ERole.UNKNOWN, items: DataTests.slides, title: 'Melhores ofertas!'}
  ];
  static readonly users: User[] = [
    // tslint:disable-next-line:max-line-length
    {
      name: 'Maria da Silva',
      email: 'maria@gmail.com',
      avatarUrl: 'https://vignette.wikia.nocookie.net/yugioh/images/0/08/T%C3%A9a_Gardner.png/revision/latest?cb=20140520004117',
      roles: [ERole.CUSTOMER],
      id: '1515151'
    },
    {
      name: 'Kayba Santos',
      email: 'kayba@gmail.com',
      avatarUrl: 'https://i.ytimg.com/vi/6Y9moYCgD2M/hqdefault.jpg',
      roles: [ERole.CUSTOMER],
      id: '5161615151'
    },
    {
      name: 'Cleitin O Brabo',
      email: 'cleitin@gmail.com',
      avatarUrl: 'https://vignette.wikia.nocookie.net/yugioh/images/c/c8/MaximillionPegasus.jpg/revision/latest?cb=20150530140609',
      roles: [ERole.CUSTOMER],
      id: '32432423432'
    },
    {
      name: 'Cleidimarço dos Santos',
      email: 'cleidimarco@gmail.com',
      avatarUrl: 'https://2.bp.blogspot.com/-I4F7oVUi73Y/VUf5-PpZWOI/AAAAAAAAcxM/M8IrYmYpvgM/s1600/Bakura%2BYu-Gi-Oh.jpg',
      roles: [ERole.CUSTOMER],
      id: '989859858998'
    },
  ];
  static readonly markets: Market[] = [
    {
      id: (++DataTests.marketId).toString(),
      // tslint:disable-next-line:max-line-length
      imageUrl: 'https://lh3.googleusercontent.com/proxy/5TB3D7TYj3KrVOepF7uk5SUG-ms92nYPZkV07qQrL8jFl-8bWBc-IWHXw6l_abtvbVjMq9NPCVOGNQBK_640SNm1jg7YUvbjE35Zn3zhWCHHtcLwn5B7Ma6GaKg7gcBzAnTMKspU0kJVgkqHilzJSNNUfxSX7ZP7tHkDJqU',
      logoImgUrl: 'https://paladinsgames.com.br/uploads/configloja_favico/20181019190653_favicon.png',
      name: 'Paladins Games',
      url: 'https://paladinsgames.com.br/home'
    },
    {
      id: (++DataTests.marketId).toString(),
      imageUrl: 'https://i.redd.it/417kp9m2z0oz.png',
      logoImgUrl: 'https://www.domaingames.com.br/images/logo_footer.png',
      name: 'Domain Games',
      url: 'https://www.domaingames.com.br/'
    },
    {
      id: (++DataTests.marketId).toString(),
      imageUrl: 'https://i.imgur.com/4O9Qe0g.png',
      logoImgUrl: 'https://www.lojalotusgames.com.br/img/lotusgames2.png',
      name: 'Lotus Games',
      url: 'https://www.lojalotusgames.com.br/'
    },
    {
      id: (++DataTests.marketId).toString(),
      imageUrl: 'https://cdn11.bigcommerce.com/s-0kvv9/product_images/theme_images/onward.jpg?t=1581542509',
      // tslint:disable-next-line:max-line-length
      logoImgUrl: 'https://cdn11.bigcommerce.com/s-0kvv9/stencil/5d84e5d0-2ff3-0138-06f9-0242ac110009/e/ccff5d00-2bfa-0138-bad2-0242ac11000c/img/logo.png',
      name: 'Toywiz',
      url: 'https://toywiz.com'
    },
    {
      id: (++DataTests.marketId).toString(),
      imageUrl: 'https://www.duelshop.com.br/modules/themeconfigurator/img/134e7d9b06d4ef28d6e1039392666084859d0619_pkmsm3m.jpg',
      logoImgUrl: 'https://www.duelshop.com.br/themes/default-bootstrap/img/logo.png',
      name: 'Duel Shop',
      url: 'https://www.duelshop.com.br/'
    },
    {
      id: (++DataTests.marketId).toString(),
      imageUrl: 'https://www.lmcorp.com.br/arquivos/up/ecom/home/g/159647_1564141850.png',
      logoImgUrl: 'https://www.lmcorp.com.br/arquivos/ecom/159647/images/head_logo_p.png',
      name: 'World Card Games',
      url: 'https://www.worldcardgames.com.br/'
    },
    {
      id: (++DataTests.marketId).toString(),
      imageUrl: 'https://www.animenew.com.br/wp-content/uploads/2013/12/Yu-Gi-Oh-Arc-V.jpg',
      logoImgUrl: 'https://http2.mlstatic.com/ui/navigation/4.5.0/mercadolibre/logo-pt__large_plus.png',
      name: 'Mercado Livre',
      url: 'https://produto.mercadolivre.com.br/'
    }
  ];
  static readonly orders: Order[] = [
    {
      id: (++DataTests.orderId).toString(),
      items: [
        {
          id: '1',
          amount: 2,
          product: DataTests.products[0],
          productId: DataTests.products[0].id,
          unitPrice: DataTests.products[0].priceWithDiscount
        }],
      state: EStateOrder.DELIVERED,
      costDelivery: util.randomFloat(0, 100),
      costItems: util.randomFloat(0, 600),
      dateDelivery: new Date(),
      addressTargetId: DataTests.addresses[0].id,
      date: new Date(2020, 4, 12),
      daysForDelivery: util.randomInt(0, 100)
    },
    {
      id: (++DataTests.orderId).toString(),
      items: [
        {
          id: '2',
          amount: 2,
          product: DataTests.products[1],
          productId: DataTests.products[1].id,
          unitPrice: DataTests.products[1].priceWithDiscount
        },
        {
          id: '2',
          amount: 95,
          product: DataTests.products[5],
          productId: DataTests.products[5].id,
          unitPrice: DataTests.products[5].priceWithDiscount
        },
        {
          id: '3',
          amount: 7,
          product: DataTests.products[3],
          productId: DataTests.products[3].id,
          unitPrice: DataTests.products[3].priceWithDiscount
        }
      ],
      state: EStateOrder.DELIVERED,
      costItems: util.randomFloat(0, 600),
      costDelivery: util.randomFloat(0, 100),
      dateDelivery: new Date(),
      addressTargetId: DataTests.addresses[1].id,
      date: new Date(2020, 3, 2),
      daysForDelivery: util.randomInt(0, 100)
    },
  ];
  static readonly listProducts: ListProduct[] = [
    {
      title: 'Ofertas da semana :D',
      items: DataTests.products,
      itemsId: DataTests.products.map(p => p.id),
      id: '1',
      readRole: ERole.UNKNOWN
    }
  ];
  static readonly listMarkets: ListMarket[] = [
    {
      title: 'Nossos parceiros <3',
      items: DataTests.markets,
      id: '1',
      readRole: ERole.UNKNOWN
    },
  ];
  static readonly listLinks: ListLink[] = [
    {
      id: '1',
      items: [
        {text: 'Sobre', url: routesFrontend.about},
        {text: 'Contato', url: routesFrontend.contact},
        {text: 'Categorias', url: routesFrontend.categoriesManagement},
        {text: 'Promoções', url: routesFrontend.home},
      ],
      readRole: ERole.UNKNOWN,
      title: 'Loja'
    },
    {
      id: '2',
      items: [
        {text: 'Meu perfil', url: routesFrontend.userProfile},
        {text: 'Minhas avaliações', url: routesFrontend.userReviews},
        {text: 'Minhas compras', url: routesFrontend.userOrders},
        {text: 'Minhas atividades', url: routesFrontend.userActivities},
        {text: 'Carrinho', url: routesFrontend.cart},
        {text: 'Segurança', url: routesFrontend.userSecurity},
      ],
      readRole: ERole.CUSTOMER,
      title: 'Minha conta'
    },
    {
      id: '3',
      items: [
        {text: 'Gerenciar categorias', url: routesFrontend.categoriesManagement},
        {text: 'Gerenciar usuários', url: routesFrontend.usersManagement},
        {text: 'Gerenciar pedidos', url: routesFrontend.ordersManagement},
        {text: 'Gerenciar produtos', url: routesFrontend.productsManagement},
        {text: 'Relatórios', url: routesFrontend.reports},
      ],
      readRole: ERole.ADMIN,
      title: 'Área Administrativa'
    },
    {
      id: '4',
      items: DataTests.markets.map(market => {
        return {url: market.url, text: market.name};
      }),
      readRole: ERole.UNKNOWN,
      title: 'Parceiros'
    },
  ];

  private static notificRandom(): NotificationModel {
    return new NotificationModel(
      ++DataTests.notificId,
      'Sua encomenda está a caminho! Acompanhe o estado de sua compra',
      new Date(),
      'www.google.com',
      Math.floor(Math.random() * 8)
    );
  }

  private static productRandom(title: string, desc: string, imgUrl: string): Product {
    const price = randomFloat(25, 250);
    const discount = randomFloat(0, 99);
    return {
      title,
      desc,
      price,
      cost: randomFloat(1, 24),
      urlMainImage: imgUrl,
      percentOff: discount,
      categoriesId: [DataTests.categories[randomInt(0, DataTests.categories.length - 1)].id],
      categories: [DataTests.categories[randomInt(0, DataTests.categories.length - 1)]],
      freeDelivery: randomBoolean(),
      id: (++DataTests.productId).toString(),
      amountAvailable: randomInt(0, 10000),
      avgReview: randomFloat(0, 5),
      priceWithDiscount: price * ((100 - discount) / 100),
      visible: true,
      width: randomInt(0, 100),
      length: randomInt(0, 100),
      height: randomInt(0, 100),
      weight: randomInt(0, 100),
    };
  }

  private static obterPrecoRandom(): number {
    return Math.random() * 1000;
  }
}
