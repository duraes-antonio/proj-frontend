'use strict';
import {AfterViewInit, Component, Input} from '@angular/core';
import Glide from '@glidejs/glide';
import {genSequence, randomInt} from '../../../shared/utilFunctions';

@Component({
  selector: 'app-slider-base',
  templateUrl: './slider-base.component.html',
  styleUrls: ['./slider-base.component.scss']
})
export class SliderBaseComponent implements AfterViewInit {

  @Input() sliderId: string;
  @Input() showBullets = true;
  @Input() maxHeight = '500px';
  public idxBullets = [];
  public currIndex = 0;
  private _glide: Glide;
  private _sliderLen = 0;

  constructor() {
    this.sliderId = this.sliderId || randomInt().toString();
  }

  get sliderLength(): number {
    return this._sliderLen;
  }

  @Input()
  set sliderLength(len: number) {
    this._sliderLen = len;
    this.idxBullets = genSequence(this.sliderLength, 0);
  }

  ngAfterViewInit(): void {
    const options = {
      animationDuration: 300,
      type: 'carousel',
      startAt: 0,
      perView: 7,
      breakpoints: {
        992: {
          perView: 4
        },
        600: {
          perView: 3
        },
        420: {
          perView: 2
        },
        360: {
          perView: 1
        }
      }
    };

    const glideElem = document.getElementById(this.sliderId);
    glideElem.style.setProperty('--slide-max-height', this.maxHeight);
    this._glide = new Glide(glideElem, options).mount();

    /*Após cada movimento, atualize o índice do slide atual p/ estilizar o indicador*/
    if (this.showBullets) {
      this._glide.on(['move.after'], () => {
        this.currIndex = this._glide.index;
      });
    }
  }

  goToIndexSlide(i: number) {
    this._glide.go(`=${i}`);
  }
}
