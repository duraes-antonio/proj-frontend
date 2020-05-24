'use strict';
import {ERole} from '../enum/roles';
import {EntitySaved} from './entity-saved';
import {FilterBasic} from './filters/filter-basic';
import {UserOptionsSort} from '../enum/user';

export interface UserPatch {
  readonly avatarUrl?: string;
  readonly codeArea?: number;
  readonly name?: string;
  readonly password?: string;
  readonly phone?: string;
  readonly roles?: ERole[];
}

export interface UserAdd extends UserPatch {
  readonly cpf: string;
  readonly codeArea: number;
  readonly email: string;
  readonly name: string;
  readonly password: string;
  readonly phone: string;
  readonly roles: ERole[];
}

// TODO: Trabalhar com redes sociais
export interface User extends UserAdd {
  readonly id: string;
}

export interface UserViewModel extends EntitySaved {
  readonly avatarUrl?: string;
  readonly name: string;
  readonly roles: ERole[];
  readonly quantityPurchases: number;
}

export interface UserSearch extends FilterBasic {
  count: number;
  result: UserViewModel[];
  sortBy?: UserOptionsSort;
}
