'use strict';
import {Component, EventEmitter, OnDestroy, Output} from '@angular/core';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {Subscription} from 'rxjs';
import {NotificationModel} from '../../models/notification';
import {Cart} from '../../models/cart.model';
import {DataTests} from '../../../shared/dataTests';
import {AuthService} from '../../services/auth.service';
import {routesFrontend} from '../../../shared/constants/routesFrontend';

@Component({
  selector: 'app-navbar',
  templateUrl: 'navbar.component.html',
  styleUrls: ['navbar.component.scss']
})
export class NavbarComponent implements OnDestroy {

  @Output() sidenavShow = new EventEmitter();

  showNotifics = false;
  notifics: NotificationModel[] = DataTests.notifications;
  numActiveNotif: number = this.notifics.filter(n => !n.read).length;
  cartProdsIds: number[] = [];
  userLogged = false;
  routes = routesFrontend;
  private readonly _cart$: Subscription;
  private readonly _userLogged$: Subscription;

  constructor(
    private readonly _store: Store<Cart>,
    private readonly _router: Router,
    private readonly _auth: AuthService
  ) {
    this._cart$ = this._store.subscribe((res: any) => {
      this.cartProdsIds = res.cart.productsId ? res.cart.productsId : [];
    });
    this.userLogged = !!AuthService.userLogged;
    this._userLogged$ = AuthService.userLoggedEmitter.subscribe(
      (res: boolean) => this.userLogged = res
    );
  }

  ngOnDestroy(): void {
    this._cart$.unsubscribe();
    this._userLogged$.unsubscribe();
  }

  toggleListNotif() {
    this.showNotifics = !this.showNotifics;
  }

  /* TODO: Chamar serviço*/
  toggleNotif(notif: NotificationModel) {
    notif.toggle();
    notif.read ? --this.numActiveNotif : ++this.numActiveNotif;
  }

  /* TODO: Chamar serviço*/
  markNotifAsRead(notif: NotificationModel) {
    if (!notif.read) {
      notif.read = true;
      --this.numActiveNotif;
    }
  }

  /* TODO: Chamar serviço*/
  markAllNotifAsRead() {
    if (this.numActiveNotif > 0) {
      this.notifics.forEach(n => n.read = true);
      this.numActiveNotif = 0;
    }
  }

  search(text: string) {
    this._router.navigate([routesFrontend.productsView], {queryParams: {text: text}});
  }

  logout() {
    this._auth.logout().subscribe();
  }
}
