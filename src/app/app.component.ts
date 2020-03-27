import {Component} from '@angular/core';
import {ListLink} from './models/componentes/listLink';
import {Link} from './models/componentes/link';
import {User} from './models/user';
import {DataTests} from '../shared/dataTests';
import {ERole} from './enum/roles';
import {AuthService} from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'proj-frontend';

  listaLinks: Array<ListLink>;
  readonly user: User = DataTests.users[0];
  sidenavShow = false;

  constructor() {
    this.listaLinks = new Array<ListLink>();
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

    this.listaLinks.push(new ListLink('Loja', linksLoja));
    this.listaLinks.push(new ListLink('Minha conta', linksMinhaConta, ERole.CUSTOMER));
    this.listaLinks.push(new ListLink('Área Administrativa', linksAdmin, ERole.ADMIN));
    this.listaLinks.push(new ListLink('Parceiros', linksParceiros));

    AuthService.loadFromLocalToken();
  }
}
