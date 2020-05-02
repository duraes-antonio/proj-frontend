'use strict';
import {ERole} from '../enum/roles';

export interface UserAdd {
  readonly avatarUrl?: string;
  readonly cpf: string;
  readonly codeArea: number;
  readonly email: string;
  readonly name: string;
  readonly password?: string;
  readonly phone: string;
  readonly roles: ERole[];
}

// TODO: Trabalhar com redes sociais
export interface User extends UserAdd {
  readonly id: string;
}
