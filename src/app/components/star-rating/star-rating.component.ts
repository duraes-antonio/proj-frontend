'use strict';
import {Component, ElementRef, Input, ViewChild} from '@angular/core';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.scss']
})
export class StarRatingComponent {

  @Input() fontSize = 20;
  @Input() showNumRatings = true;
  @Input() numRatings = 0;
  public diffAvgIdxs = this.calcDiffAvgIndex(this.maxStars, this.valueRating);
  @ViewChild('stars') private starsElem?: ElementRef<HTMLElement>;

  private _maxStars = 5;

  get maxStars() {
    return this._maxStars;
  }

  @Input()
  set maxStars(value: number) {
    this._maxStars = value;
    this.updateValues();
  }

  private _valueRating = 0;

  get valueRating() {
    return this._valueRating;
  }

  @Input()
  set valueRating(value: number) {
    this._valueRating = value;
    this.updateValues();
  }

  private calcDiffAvgIndex(numStars: number, average: number): number[] {
    return Array(numStars).fill(0).map((x, i) => average - i);
  }

  private updateValues() {
    this.diffAvgIdxs = this.calcDiffAvgIndex(this.maxStars, this.valueRating);
    setTimeout(() => {
      if (this.starsElem) {
        this.starsElem.nativeElement.style.setProperty(
          '--percent-fill',
          `${100 * this.diffAvgIdxs[Math.floor(this.valueRating)]}%`
        );
        this.starsElem.nativeElement.style.setProperty(
          '--font-size',
          ` ${this.fontSize}px`
        );
      }
    });
  }
}
