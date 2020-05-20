import {Component} from '@angular/core';
import {UserService} from '../../../services/user.service';
import {Observable} from 'rxjs';
import {User} from '../../../models/user';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent {

  users$: Observable<User[]>;

  constructor(private readonly _userServ: UserService) {
    this.users$ = this._userServ.get();
  }
}
