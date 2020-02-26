'use strict';
import {Component, Input} from '@angular/core';
import {Avaliacao} from '../../models/Avaliacao';
import {fmtTimestamp} from '../../../shared/constants/formats';

@Component({
  selector: 'app-rating-list',
  templateUrl: './rating-list.component.html',
  styleUrls: ['./rating-list.component.scss']
})
export class RatingListComponent {

  @Input() ratings: Avaliacao[];
  public fmtData: string = fmtTimestamp;
}
