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
  diffAvgIdxs = this._calcDiffAvgIndex(this.maxStars, this.valueRating);
  @ViewChild('stars') private readonly _starsElem?: ElementRef<HTMLElement>;

  private _maxStars = 5;

  get maxStars() {
    return this._maxStars;
  }

  @Input()
  set maxStars(value: number) {
    this._maxStars = value;
    this._updateValues();
  }

  private _valueRating = 0;

  get valueRating() {
    return this._valueRating;
  }

  @Input()
  set valueRating(value: number) {
    this._valueRating = value;
    this._updateValues();
  }

  private _calcDiffAvgIndex(numStars: number, average: number): number[] {
    return Array(numStars).fill(0).map((x, i) => average - i);
  }

  private _updateValues() {
    this.diffAvgIdxs = this._calcDiffAvgIndex(this.maxStars, this.valueRating);
    setTimeout(() => {
      if (this._starsElem) {
        this._starsElem.nativeElement.style.setProperty(
          '--percent-fill',
          `${100 * this.diffAvgIdxs[Math.floor(this.valueRating)]}%`
        );
        this._starsElem.nativeElement.style.setProperty(
          '--font-size',
          ` ${this.fontSize}px`
        );
      }
    });
  }
}
