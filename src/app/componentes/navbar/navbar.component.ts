import {Component, OnDestroy, OnInit} from '@angular/core';
import {Usuario} from '../../models/Usuario';
import {Notificacao} from '../../models/Notificacao';
import {Cart} from '../../models/cart.model';
import {Store} from '@ngrx/store';

@Component({
  selector: 'app-navbar',
  templateUrl: 'navbar.component.html',
  styleUrls: ['navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {

  public showSidenav: boolean;
  public showNotifics: boolean;
  public currUser: Usuario;
  public notifics: Array<Notificacao>;
  public numActiveNotif: number;
  public cart$;
  public cartProdsIds: number[];

  constructor(private store: Store<Cart>) {
    this.cart$ = this.store.subscribe(
      (res: any) => {
        this.cartProdsIds = res.cart.productsId ? res.cart.productsId : [];
      });
  }

  ngOnInit() {
    this.showNotifics = false;

    /*TODO: Alterar para receber os dados do usuário após login*/
    this.currUser = new Usuario(
      'Joana Maria Silva',
      'joana@email.com'
    );
    this.currUser.definirUrlAvatar(
      '../../assets/tea.png'
    );

    this.notifics = new Array<Notificacao>();
    this.numActiveNotif = 7;

    for (let i = 0; i < 7; ++i) {
      this.notifics.push(
        new Notificacao(
          'Sua encomenda está a caminho! Acompanhe o estado de sua compra',
          new Date(),
          'www.google.com',
          Math.floor(Math.random() * 8)
        )
      );
    }

    this.notifics[2].lida = true;
  }

  ngOnDestroy(): void {
    this.cart$.unsubscribe();
  }

  /**Oculta o menu lateral se já estiver sendo exibido, senão, exibe-o.
   */
  public toggleSidenav() {
    this.showSidenav = !this.showSidenav;
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
    } else {
      return;
    }
  }

  print(x) {
    console.log(x);
  }
}
