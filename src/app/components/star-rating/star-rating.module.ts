import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {StarRatingComponent} from './star-rating.component';



@NgModule({
  declarations: [
    StarRatingComponent
  ],
  exports: [
    StarRatingComponent
  ],
  imports: [
    CommonModule
  ]
})
export class StarRatingModule { }
