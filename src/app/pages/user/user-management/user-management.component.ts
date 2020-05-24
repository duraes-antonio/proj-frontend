import {Component} from '@angular/core';
import {UserService} from '../../../services/user.service';
import {Observable} from 'rxjs';
import {UserSearch} from '../../../models/user';
import {debounceTime, distinctUntilChanged, filter, switchMap} from 'rxjs/operators';
import {NgxSpinnerService} from 'ngx-spinner';
import {AbstractControl, FormControl, FormGroup} from '@angular/forms';
import {FilterUser} from '../../../models/filters/filter-user';
import {UserOptionsSort} from '../../../enum/user';
import {validators} from '../../../../shared/validations/validatorsCustom';
import {fmtDate} from '../../../../shared/constants/formats';
import {userConstants} from '../../../../shared/constants/objects/user';
import {userSizes} from '../../../../shared/constants/field-size';
import {getMsgFront} from '../../../../shared/validations/msgErrorFunctionsFront';
import {utilDOM} from '../../../../shared/util.dom';
import {AuthService} from '../../../services/auth.service';
import {ERole} from '../../../enum/roles';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent {

  readonly filter: FilterUser = {
    currentPage: 1,
    perPage: 10,
    sortBy: UserOptionsSort.NAME
  };
  readonly formGroup = new FormGroup({
    dateStart: new FormControl(null, validators.dateValidator(false)),
    dateEnd: new FormControl(null, validators.dateValidator(false)),
    roles: new FormControl([]),
    text: new FormControl(''),
  });
  readonly fmtDate = fmtDate;
  readonly sizes = userSizes;
  readonly userConsts = userConstants;
  readonly _getMsgError = getMsgFront;
  readonly _currentUserId = AuthService.userLogged?.id;
  userSearchResult?: UserSearch;
  requesting = false;
  sortBy = UserOptionsSort.NAME;

  constructor(
    private readonly _userServ: UserService,
    private readonly _loadingServ: NgxSpinnerService
  ) {
    _loadingServ.show();
    const textChanges$ = this.formGroup.controls['text'].valueChanges
      .pipe(
        debounceTime(250),
        filter(value => value.length > 1),
        distinctUntilChanged(),
        switchMap(text => {
          this.showLoading();
          return this._userServ.get(
            this._updateFilter(this.filter, {...this.formGroup.value, sortBy: this.sortBy, text})
          );
        })
      );
    this._extractSearch(textChanges$);
    this._extractSearch(this._userServ.get(this.filter));
  }

  maskDate(event: Event, control: AbstractControl) {
    utilDOM.maskDate(event, control);
  }

  searchUsers(targetPage?: number) {
    const request = this._userServ.get(
      this._updateFilter(
        this.filter,
        {
          ...this.formGroup.value,
          sortBy: this.sortBy,
          currentPage: targetPage ?? this.filter.currentPage
        })
    );
    this._extractSearch(request);
  }

  showLoading() {
    this.requesting = true;
    this.formGroup.disable();
  }

  hideLoading() {
    this.requesting = false;
    this.formGroup.enable();
  }

  changePageSearch(targetPage: number) {
    this.searchUsers(targetPage);
  }

  updateRoles(userId: string, roles: ERole[], role: ERole | string) {
    const newRoles = roles.includes(role as ERole)
      ? roles.filter(r => r !== role)
      : [...roles, role] as ERole[];
    this._userServ.patchRoles(userId, newRoles).subscribe(() => this.searchUsers());
  }

  private _updateFilter(currentFilter: FilterUser, paramsFilter: object): FilterUser {
    return {...currentFilter, ...paramsFilter};
  }

  private _extractSearch(request: Observable<UserSearch>) {
    this.showLoading();
    request.subscribe(result => {
      this.userSearchResult = result;
      this.hideLoading();
    });
  }
}
