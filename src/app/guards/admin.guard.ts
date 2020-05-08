import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from '../services/auth.service';
import {ERole} from '../enum/roles';
import {routesFrontend} from '../../shared/constants/routes-frontend';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private readonly _router: Router) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!AuthService.userLogged?.roles.includes(ERole.ADMIN)) {
      this._router.navigateByUrl(routesFrontend.forbidden);
      return false;
    } else {
      return true;
    }
  }
}
