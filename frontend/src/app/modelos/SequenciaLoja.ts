import {ETipoComponente} from '../enum/ETipoComponente';
import {ISequencia} from '../interfaces/ISequencia';
import {Loja} from './Loja';

export class SequenciaLoja implements ISequencia<Loja> {

  public readonly id: number;
  public readonly tipo: ETipoComponente = ETipoComponente.SEQUENCIA_LOJA;
  public readonly titulo: string;
  public readonly itens: Array<Loja>;

  get tamanho() {
    return !!this.itens ? this.itens.length : 0;
  }

  constructor(id) {
    // TODO: Solicitar ao backend a sequencia de id atual
    this.id = id;
    this.itens = this.obterLojasMock();
    this.titulo = 'Lojas parceiras e recomendadas';
  }

  // TODO: Substituir pelos produtos recebidos do BACKEND
  private obterLojasMock(): Array<Loja> {

    const lojas = new Array<Loja>();

    lojas.push(
      new Loja(
        'https://www.pokemoncenter.com/wcsstore/MarketingContent/Hero/20190807_Banner_SM11_Desktop.jpg',
        'https://www.pokemoncenter.com/wcsstore/AuroraStorefrontAssetStore/images/pokemon-center-logo.svg',
        'Pokémon Center',
        'https://www.pokemoncenter.com/')
    );

    lojas.push(
      new Loja(
        'https://scontent.fvix2-1.fna.fbcdn.net/v/t1.0-9/66789076_2756810070999907_1460183894459416576_n.jpg?_nc_cat=103&_nc_oc=AQlFT2VisqtBtcCQIxivMXmQZowdS6nU8U9m5sJ1D1LGELuy_PyYK1vhpnefK4Sn6wg&_nc_ht=scontent.fvix2-1.fna&oh=789bc67e60a52777437f7bba84074d2b&oe=5DD02CAB',
        'https://www.duelshop.com.br/themes/default-bootstrap/img/logo.png',
        'Duel Shop',
        'https://www.duelshop.com.br/')
    );

    lojas.push(
      new Loja(
        'https://www.lmcorp.com.br/arquivos/up/ecom/home/g/159647_1564141850.png',
        'https://www.lmcorp.com.br/arquivos/ecom/159647/images/head_logo_p.png',
        'World Card Games',
        'https://www.worldcardgames.com.br/')
    );

    lojas.push(
      new Loja(
        'https://http2.mlstatic.com/cartas-yu-gioh-verso-anime-a-sua-escolha-D_NQ_NP_771353-MLB28253934320_092018-Q.webp',
        'https://http2.mlstatic.com/ui/navigation/4.5.0/mercadolibre/logo-pt__large_plus.png',
        'Mercado Livre',
        'https://produto.mercadolivre.com.br/')
    );

    return lojas;
  }
}
