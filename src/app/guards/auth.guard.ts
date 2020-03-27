import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {routesFrontend} from '../../shared/constants/routesFrontend';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private _router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    if (AuthService.isLoggedIn()) {
      return true;
    }

    this.loginAndReturn(state.url);
    return false;
  }

  private loginAndReturn(urlOrigin: string) {
    AuthService.urlPrevius = urlOrigin;
    this._router.navigate([routesFrontend.login]);
  }
}
