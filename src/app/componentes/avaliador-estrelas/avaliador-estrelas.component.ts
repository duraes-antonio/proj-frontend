'use strict';
import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-avaliador-estrelas',
  templateUrl: './avaliador-estrelas.component.html',
  styleUrls: ['./avaliador-estrelas.component.scss']
})
export class AvaliadorEstrelasComponent implements OnInit {

  @Input() valueRating = 0;
  @Input() numRatings = 0;
  @Input() fontSize = 20;
  @Input() showNumRatings = true;
  public diffAvgIdxs = this.calcDiffAvgIndex(this.maxStars, this.valueRating);
  @ViewChild('stars')
  private starsElem: ElementRef<HTMLElement>;

  constructor() {
  }

  private _maxStars = 5;

  get maxStars() {
    return this._maxStars;
  }

  @Input()
  set maxStars(valor: number) {
    this._maxStars = valor;
    this.diffAvgIdxs = this.calcDiffAvgIndex(valor, this.valueRating);

    setTimeout(() => {
      this.starsElem.nativeElement.style.setProperty(
        '--percent-fill',
        `${100 * this.diffAvgIdxs[Math.floor(this.valueRating)]}%`
      );
      this.starsElem.nativeElement.style.setProperty('--font-size', ` ${this.fontSize}px`);
    }, 500);
  }

  ngOnInit() {
  }

  calcDiffAvgIndex(numStars: number, average: number): number[] {
    return Array(numStars)
      .fill(0).map((x, i) => average - i);
  }
}
