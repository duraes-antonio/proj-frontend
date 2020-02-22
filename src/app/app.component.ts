import {Component} from '@angular/core';
import {ListaLinks} from './models/componentes/ListaLinks';
import {Link} from './models/componentes/Link';
import {Usuario} from './models/Usuario';
import {DadosTeste} from '../shared/DadosTeste';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'proj-frontend';

  listaLinks: Array<ListaLinks>;
  readonly user: Usuario = DadosTeste.usuarios[0];
  sidenavShow = false;

  constructor() {
    this.listaLinks = new Array<ListaLinks>();
    const urlGoogle = 'www.google.com';

    const titulosLoja = ['Sobre', 'Contato', 'Categorias', 'Promoções'];
    const titulosMinhaConta = ['Meu perfil', 'Minhas dúvidas', 'Minhas avaliações',
      'Minhas compras', 'Minhas atividades', 'Gerenciar pagamento',
      'Gerenciar endereço', 'Carrinho', 'Segurança'];
    const titulosParceiros = ['Mercado Livre', 'Duel Shop', 'World Card Games',
      'Pokémon Center'];
    const titulosAdmin = ['Gerenciar avaliações', 'Gerenciar dúvidas',
      'Gerenciar pedidos', 'Gerenciar produtos', 'Relatórios'];

    const linksLoja = [];
    const linksMinhaConta = [];
    const linksAdmin = [];
    const linksParceiros = [];

    for (const link of titulosLoja) {
      linksLoja.push(new Link(link, urlGoogle));
    }
    for (const link of titulosMinhaConta) {
      linksMinhaConta.push(new Link(link, urlGoogle));
    }
    for (const link of titulosAdmin) {
      linksAdmin.push(new Link(link, urlGoogle));
    }
    for (const link of titulosParceiros) {
      linksParceiros.push(new Link(link, urlGoogle));
    }

    this.listaLinks.push(new ListaLinks('Loja', linksLoja));
    this.listaLinks.push(new ListaLinks('Minha conta', linksMinhaConta));
    this.listaLinks.push(new ListaLinks('Área Administrativa', linksAdmin));
    this.listaLinks.push(new ListaLinks('Parceiros', linksParceiros));
  }
}
