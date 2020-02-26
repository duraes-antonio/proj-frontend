import {Component, Input, OnDestroy} from '@angular/core';
import {LinkList} from '../../models/componentes/LinkList';
import {AuthService} from '../../services/auth.service';
import {Subscription} from 'rxjs';
import {ERole} from '../../enum/roles';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnDestroy {
  _roles = ERole;
  _userLogged = false;
  _userRole = ERole.UNKNOWN;
  _currYear: number = (new Date()).getFullYear();

  private _userLogged$: Subscription;

  constructor() {
    this._userLogged$ = AuthService.userLoggedEmitter.subscribe(
      res => {
        this._userLogged = res;
        this._userRole = AuthService.userRole;
      }
    );
  }

  private _links: LinkList[];

  get links(): LinkList[] {
    return this._links;
  }

  @Input()
  set links(value: LinkList[]) {
    this._links = value;
  }

  ngOnDestroy(): void {
    this._userLogged$.unsubscribe();
  }

  allowRead(readRole: ERole): boolean {
    return ERole.UNKNOWN === readRole || this._userRole === ERole.ADMIN || readRole === this._userRole;
  }
}
