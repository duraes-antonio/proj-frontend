'use strict';
import {FilterBasic} from './filter-basic';
import {ERole} from '../../enum/roles';
import {UserOptionsSort} from '../../enum/user';

export interface FilterUser extends FilterBasic {
  name?: string;
  dateEnd?: Date;
  dateStart?: Date;
  roles?: ERole[];
  sortBy?: UserOptionsSort;
}
