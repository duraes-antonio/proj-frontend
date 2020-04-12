import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {User} from '../../models/user';
import {routesFrontend} from '../../../shared/constants/routesFrontend';
import {MatSidenav} from '@angular/material/sidenav';
import {AuthService} from '../../services/auth.service';
import {take} from 'rxjs/operators';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {

  @Input() user = new User('', '');
  @Output() closed = new EventEmitter();
  @ViewChild('sidenav') sidenav?: MatSidenav;
  opened = false;
  readonly actionsPersonal: LinkAction[] = [
    new LinkAction('Meu perfil', '', 'fas fa-user-cog'),
    new LinkAction('Suas compras', '', 'fas fa-shopping-basket'),
    new LinkAction('Histórico de atividades', '', 'fas fa-history'),
    new LinkAction('Segurança', '', 'fas fa-shield-alt')
  ];
  readonly actionsAdmin: LinkAction[] = [
    new LinkAction('Gerenciar categorias', '', 'fas fa-tags'),
    new LinkAction('Gerenciar produtos', routesFrontend.productsManager, 'fas fa-box-open'),
    new LinkAction('Gerenciar dúvidas', '', 'fas fa-comments'),
    new LinkAction('Gerenciar usuários', '', 'fas fa-users-cog'),
    new LinkAction('Visualizar pedido', '', 'fas fa-file-signature'),
    new LinkAction('Visualizar relatórios', '', 'fas fa-chart-bar'),
    new LinkAction('Personalizar loja', '', 'fas fa-pen-fancy')
  ];
  readonly actionLogout: LinkAction = new LinkAction('Sair', routesFrontend.home, 'fas fa-sign-out-alt');

  constructor(private auth: AuthService) {
  }

  _show = false;

  @Input()
  set show(value: boolean) {
    this._show = value;
    value ? this.open() : this.close();
  }

  close() {
    if (this.sidenav) {
      this.sidenav.close();
      this.opened = false;
      this.closed.emit();
    }
  }

  open() {
    if (this.sidenav) {
      this.sidenav.open();
      this.opened = true;
    }
  }

  logout() {
    this.auth.logout()
      .pipe(take(1))
      .subscribe(() => {
        this.close();
      });
  }
}

export class LinkAction {
  readonly title: string;
  readonly url: string;
  readonly iconClass: string;

  constructor(title: string, url: string, iconClass: string) {
    this.title = title;
    this.url = url;
    this.iconClass = iconClass;
  }
}
