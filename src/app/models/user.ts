'use strict';
import {ERole} from '../enum/roles';

export interface UserAdd {
  readonly avatarUrl?: string;
  readonly email: string;
  readonly name: string;
  readonly roles: ERole[];
}

// TODO: Trabalhar com endereço, redes sociais, permissões/role
export interface User extends UserAdd {
  readonly id: string;
}
