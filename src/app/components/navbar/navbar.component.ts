'use strict';
import {Component, EventEmitter, HostListener, OnDestroy, Output} from '@angular/core';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {NotificationModel} from '../../models/notification';
import {DataTests} from '../../../shared/dataTests';
import {AuthService} from '../../services/auth.service';
import {routesFrontend} from '../../../shared/constants/routes-frontend';
import {CartService} from '../../services/cart.service';

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
  cartProdsIds: string[] = [];
  userLogged = false;
  routes = routesFrontend;
  private readonly _cart$: Subscription;
  private readonly _userLogged$: Subscription;

  constructor(
    private readonly _router: Router,
    private readonly _auth: AuthService
  ) {
    this._cart$ = CartService.productIds$
      .subscribe((ids: string[]) => this.cartProdsIds = ids);
    this.userLogged = !!AuthService.userLogged;
    this._userLogged$ = AuthService.userLoggedEmitter.subscribe(
      (res: boolean) => this.userLogged = res
    );
  }

  @HostListener('document:keydown.esc', ['$event'])
  onKeyEscHandler(event: KeyboardEvent) {
    event.preventDefault();
    if (this.showNotifics) {
      this.showNotifics = false;
    }
  }

  @HostListener('document:click', ['$event'])
  onKeyClickHandler(event: MouseEvent) {
    event.preventDefault();
    if (!this.showNotifics) {
      return;
    }
    const trigger = document.getElementById('notifications-trigger');
    if (trigger?.contains(event.target as HTMLElement)) {
      return;
    }
    const notifications = document.getElementById('notifications');
    if (!notifications?.contains(event.target as HTMLElement)) {
      this.showNotifics = false;
    }
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
