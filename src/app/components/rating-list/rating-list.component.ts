'use strict';
import {Component, Input} from '@angular/core';
import {Review} from '../../models/review';
import {fmtTimestamp} from '../../../shared/constants/formats';

@Component({
  selector: 'app-rating-list',
  templateUrl: './rating-list.component.html',
  styleUrls: ['./rating-list.component.scss']
})
export class RatingListComponent {

  @Input() reviews: Review[] = [];
  fmtData: string = fmtTimestamp;
}
