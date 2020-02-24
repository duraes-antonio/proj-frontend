import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {Usuario} from '../../models/Usuario';
import {routes} from '../../../shared/constants/routes';
import {MatSidenav} from '@angular/material/sidenav';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {

  @Input() usuario: Usuario;
  @Output() closed = new EventEmitter();
  @ViewChild('sidenav') sidenav: MatSidenav;
  opened = false;
  readonly actionsPersonal: LinkAction[] = [
    new LinkAction('Meu perfil', '', 'fas fa-user-cog'),
    new LinkAction('Suas compras', '', 'fas fa-shopping-basket'),
    new LinkAction('Histórico de atividades', '', 'fas fa-history'),
    new LinkAction('Segurança', '', 'fas fa-shield-alt')
  ];
  readonly actionsAdmin: LinkAction[] = [
    new LinkAction('Gerenciar categorias', '', 'fas fa-tags'),
    new LinkAction('Gerenciar produtos', routes.productsManager, 'fas fa-box-open'),
    new LinkAction('Gerenciar dúvidas', '', 'fas fa-comments'),
    new LinkAction('Gerenciar usuários', '', 'fas fa-users-cog'),
    new LinkAction('Visualizar pedido', '', 'fas fa-file-signature'),
    new LinkAction('Visualizar relatórios', '', 'fas fa-chart-bar'),
    new LinkAction('Personalizar loja', '', 'fas fa-pen-fancy')
  ];
  readonly actionLogout: LinkAction = new LinkAction('Sair', '', 'fas fa-sign-out-alt');

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
    this.sidenav.open();
    this.opened = true;
  }
}

export class LinkAction {
  public readonly title: string;
  public readonly url: string;
  public readonly iconClass: string;

  constructor(title: string, url: string, iconClass: string) {
    this.title = title;
    this.url = url;
    this.iconClass = iconClass;
  }
}
