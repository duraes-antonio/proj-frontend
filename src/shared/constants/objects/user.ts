import {ERole} from '../../../app/enum/roles';
import {UserOptionsSort} from '../../../app/enum/user';

const _userRoles: { [key in ERole]: string } = {
  [ERole.ADMIN]: 'Administrador',
  [ERole.CUSTOMER]: 'Cliente',
  [ERole.UNKNOWN]: 'Desconhecida',
};
const _userRolesIterable = Object.keys(ERole).map(k => k.toLowerCase());
const _userSortIterable: { key: UserOptionsSort, name: string }[] = [
  {key: UserOptionsSort.NAME, name: 'Nome do usuário'},
  {key: UserOptionsSort.NEWEST, name: 'Mais recentes'},
  {key: UserOptionsSort.OLDEST, name: 'Mais antigos'},
  {key: UserOptionsSort.QUANTITY_PURCHASES, name: 'Número de pedidos'},
];
export const userConstants = {
  userRoles: _userRoles,
  userRolesIterable: _userRolesIterable,
  userSortIterable: _userSortIterable
};
