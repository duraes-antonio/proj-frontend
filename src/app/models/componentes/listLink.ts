'use strict';
import {Link} from './link';
import {ERole} from '../../enum/roles';
import {ASequence} from '../../interfaces/sequence';
import {TypeComponent} from '../../enum/typeComponent';

export class ListLink extends ASequence<Link> {
  readonly readRole: ERole = ERole.UNKNOWN;
  readonly type: TypeComponent = TypeComponent.LIST_LINK;

  constructor(title: string, items: Link[], minRole = ERole.UNKNOWN, id = 0) {
    super(TypeComponent.LIST_LINK, title, items, id);
  }
}
