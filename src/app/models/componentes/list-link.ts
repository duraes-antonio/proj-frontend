'use strict';
import {Sequence, SequenceAdd} from './sequence';
import {Link} from './link';

export interface ListLinkAdd extends SequenceAdd<Link> {
}

export interface ListLink extends Sequence<Link> {
}
