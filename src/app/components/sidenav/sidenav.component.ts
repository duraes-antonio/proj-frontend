import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {User} from '../../models/user';
import {routesFrontend as routes} from '../../../shared/constants/routesFrontend';
import {MatSidenav} from '@angular/material/sidenav';
import {AuthService} from '../../services/auth.service';
import {take} from 'rxjs/operators';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {

  @Input() user?: User;
  @Output() closed = new EventEmitter();
  @ViewChild('sidenav') sidenav?: MatSidenav;
  opened = false;
  readonly actionsPersonal: LinkAction[] = [
    new LinkAction('Meu perfil', routes.userProfile, 'fas fa-user-cog'),
    new LinkAction('Suas compras', routes.userOrders, 'fas fa-shopping-basket'),
    new LinkAction('Histórico de atividades', routes.userActivities, 'fas fa-history'),
    new LinkAction('Segurança', routes.userSecurity, 'fas fa-shield-alt')
  ];
  readonly actionsAdmin: LinkAction[] = [
    new LinkAction('Gerenciar categorias', routes.categoriesManagement, 'fas fa-tags'),
    new LinkAction('Gerenciar produtos', routes.productsManagement, 'fas fa-box-open'),
    new LinkAction('Gerenciar usuários', routes.usersManagement, 'fas fa-users-cog'),
    new LinkAction('Visualizar pedido', routes.ordersManagement, 'fas fa-file-signature'),
    new LinkAction('Visualizar relatórios', routes.reports, 'fas fa-chart-bar'),
    new LinkAction('Personalizar loja', routes.customize, 'fas fa-pen-fancy')
  ];
  readonly actionLogout: LinkAction = new LinkAction('Sair', routes.home, 'fas fa-sign-out-alt');

  constructor(private readonly _auth: AuthService) {
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
    this._auth.logout()
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
