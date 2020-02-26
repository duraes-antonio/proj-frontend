'use strict';
import {Component, EventEmitter, OnDestroy, Output} from '@angular/core';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {Subscription} from 'rxjs';
import {Notificacao} from '../../models/Notificacao';
import {Cart} from '../../models/cart.model';
import {DataTests} from '../../../shared/dataTests';
import {AuthService} from '../../services/auth.service';
import {routes} from '../../../shared/constants/routes';

@Component({
  selector: 'app-navbar',
  templateUrl: 'navbar.component.html',
  styleUrls: ['navbar.component.scss']
})
export class NavbarComponent implements OnDestroy {

  @Output() sidenavShow = new EventEmitter();

  showNotifics = false;
  notifics: Notificacao[] = DataTests.notificacoes;
  numActiveNotif: number = this.notifics.filter(n => !n.lida).length;
  cartProdsIds: number[];
  userLogged = false;
  private _cart$: Subscription;
  private _userLogged$: Subscription;

  constructor(
    private store: Store<Cart>,
    private router: Router
  ) {
    this._cart$ = this.store.subscribe(
      (res: any) => {
        this.cartProdsIds = res.cart.productsId ? res.cart.productsId : [];
      });
    this._userLogged$ = AuthService.userLoggedEmitter.subscribe(
      res => this.userLogged = res
    );
  }

  /*TODO: Alterar para receber os dados do usuário após login*/
  ngOnDestroy(): void {
    this._cart$.unsubscribe();
    this._userLogged$.unsubscribe();
  }

  /**
   * Oculta a lista de notificações se já estiver sendo exibida, senão, exibe-a.
   */
  toggleListNotif() {
    this.showNotifics = !this.showNotifics;
  }

  /**
   * Marca uma notificação como lida ou como não lida, mudando seu visual e data de leitura.
   */
  toggleNotif(notif: Notificacao) {
    notif.toggle();
    this.numActiveNotif += notif.lida ? -1 : 1;
  }

  /**
   * Marca uma notificação como lida e atualiza o contador de notif.
   */
  markNotifAsRead(notif: Notificacao) {

    if (notif.lida !== true) {
      notif.marcarComoLida();
      this.numActiveNotif -= 1;
    }
  }

  /**
   * Marca todas notificações como lidas e atualiza o contador
   */
  markAllNotifAsRead() {
    if (this.numActiveNotif > 0) {
      this.notifics.forEach(n => n.lida = true);
      this.numActiveNotif = 0;
    }
  }

  search(text: string) {
    this.router.navigate([routes.productsView], {queryParams: {text: text}});
  }
}
