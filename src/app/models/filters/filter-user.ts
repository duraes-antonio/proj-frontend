'use strict';
import {FilterBasic} from './filter-basic';
import {ERole} from '../../enum/roles';
import {UserOptionsSort} from '../../enum/user';

export interface FilterUser extends FilterBasic {
  text?: string;
  roles?: ERole[];
  sortBy?: UserOptionsSort;
}
