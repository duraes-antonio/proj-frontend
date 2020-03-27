'use strict';

import {ERole} from '../enum/roles';

export class User {
  readonly avatarUrl?: string;
  readonly email: string = '';
  readonly name: string = '';
  readonly roles: ERole[] = [];

  // TODO: Trabalhar com endereço, redes sociais, permissões/role
  constructor(name: string, email: string, urlImg?: string) {
    this.name = name;
    this.email = email;
    this.avatarUrl = urlImg;
  }
}
