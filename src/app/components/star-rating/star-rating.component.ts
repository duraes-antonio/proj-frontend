'use strict';
import {ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.scss'],
})
export class StarRatingComponent {

  @Input() interactive = false;
  @Input() fontSize = 20;
  @Input() align: 'center' | 'left' | 'right' = 'left';
  @Input() showNumRatings = true;
  @Input() quantityReviews = 0;

  @Output() valueSelected = new EventEmitter<number>();
  diffAvgIdxs = this._calcDiffAvgIndex(this.maxStars, this.startValue);
  currentHovered: number = this.startValue;
  @ViewChild('stars') private readonly _starsElem?: ElementRef<HTMLElement>;

  private _currentValue = this.startValue;
  private _maxStars = 5;

  get maxStars() {
    return this._maxStars;
  }

  @Input()
  set maxStars(value: number) {
    this._maxStars = value;
    this._updateValues();
  }

  private _startValue = 0;

  get startValue() {
    return this._startValue;
  }

  @Input()
  set startValue(value: number) {
    this._startValue = value ?? 1;
    this._updateValues();
  }

  applyActiveFullStarStyle(indexStar: number): boolean {
    return this.diffAvgIdxs[indexStar] >= 1 || (this.interactive && indexStar <= this.currentHovered);
  }

  resetHoverEffect() {
    this.currentHovered = this._currentValue - 1;
  }

  selectValue(value: number) {
    this._currentValue = value;
    this.valueSelected.emit(value);
  }

  private _calcDiffAvgIndex(numStars: number, average: number): number[] {
    return Array(numStars).fill(0).map((x, i) => average - i);
  }

  private _updateValues() {
    this.diffAvgIdxs = this._calcDiffAvgIndex(this.maxStars, this.startValue);
    setTimeout(() => {
      if (this._starsElem) {
        this._starsElem.nativeElement.style.setProperty(
          '--percent-fill',
          `${100 * this.diffAvgIdxs[Math.floor(this.startValue)]}%`
        );
        this._starsElem.nativeElement.style.setProperty(
          '--font-size',
          ` ${this.fontSize}px`
        );
      }
    });
  }
}
