import {Component, Input, OnDestroy} from '@angular/core';
import {ListLink} from '../../models/componentes/listLink';
import {AuthService} from '../../services/auth.service';
import {Subscription} from 'rxjs';
import {ERole} from '../../enum/roles';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnDestroy {
  _userRoles: ERole[] = [ERole.UNKNOWN];
  _currYear: number = (new Date()).getFullYear();

  private readonly _userLogged$: Subscription;

  constructor() {
    this._userRoles = AuthService.userLogged?.roles ?? this._userRoles;
    this._userLogged$ = AuthService.userLoggedEmitter.subscribe(
      () => {
        this._userRoles = AuthService.userLogged?.roles ?? this._userRoles;
      }
    );
  }

  private _links: ListLink[] = [];

  get links(): ListLink[] {
    return this._links;
  }

  @Input()
  set links(value: ListLink[]) {
    this._links = value;
  }

  ngOnDestroy(): void {
    this._userLogged$.unsubscribe();
  }

  allowRead(readRole: ERole): boolean {
    return ERole.UNKNOWN === readRole
      || this._userRoles.includes(ERole.ADMIN)
      || this._userRoles.includes(readRole);
  }
}
