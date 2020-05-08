import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from '../services/auth.service';
import {routesFrontend} from '../../shared/constants/routes-frontend';

@Injectable({
  providedIn: 'root'
})
export class OwnerGuard implements CanActivate {

  constructor(private readonly _router: Router) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const allowAccess = !!AuthService.userLogged && next.params.userId && AuthService.userLogged.id === next.params.userId;

    if (!allowAccess) {
      this._router.navigate([routesFrontend.forbidden]);
    }

    return allowAccess;
  }
}
