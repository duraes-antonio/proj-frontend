'use strict';
import {Link} from './Link';
import {ERole} from '../../enum/roles';

export class LinkList {

  title: string;
  links: Link[];
  readRole = ERole.UNKNOWN;

  constructor(titulo: string, links: Link[], minRole = ERole.UNKNOWN) {
    this.title = titulo;
    this.links = links;
    this.readRole = minRole;
  }
}
