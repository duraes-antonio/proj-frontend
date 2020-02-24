'use strict';
import {Component, EventEmitter, OnDestroy, Output} from '@angular/core';
import {Notificacao} from '../../models/Notificacao';
import {Cart} from '../../models/cart.model';
import {Store} from '@ngrx/store';
import {DataTests} from '../../../shared/dataTests';

@Component({
  selector: 'app-navbar',
  templateUrl: 'navbar.component.html',
  styleUrls: ['navbar.component.scss']
})
export class NavbarComponent implements OnDestroy {

  @Output() sidenavShow = new EventEmitter();

  public showNotifics = false;
  public notifics: Notificacao[] = DataTests.notificacoes;
  public numActiveNotif: number = this.notifics.filter(n => !n.lida).length;
  public cart$;
  public cartProdsIds: number[];

  constructor(private store: Store<Cart>) {
    this.cart$ = this.store.subscribe(
      (res: any) => {
        this.cartProdsIds = res.cart.productsId ? res.cart.productsId : [];
      });
  }

  /*TODO: Alterar para receber os dados do usuário após login*/
  ngOnDestroy(): void {
    this.cart$.unsubscribe();
  }

  /**Oculta a lista de notificações se já estiver sendo exibida, senão, exibe-a.
   */
  public toggleListNotif() {
    this.showNotifics = !this.showNotifics;
  }

  /**Marca uma notificação como lida ou como não lida, mudando seu visual e data de leitura.
   */
  public toggleNotif(notif: Notificacao) {
    notif.toggle();
    this.numActiveNotif += notif.lida ? -1 : 1;
  }

  /**Marca uma notificação como lida e atualiza o contador de notif.
   */
  public markNotifAsRead(notif: Notificacao) {

    if (notif.lida !== true) {
      notif.marcarComoLida();
      this.numActiveNotif -= 1;
    }
  }

  /**Marca todas notificações como lidas e atualiza o contador*/
  public markAllNotifAsRead() {
    if (this.numActiveNotif > 0) {
      this.notifics.forEach(n => n.lida = true);
      this.numActiveNotif = 0;
    }
  }
}
