'use strict';
import {AfterViewInit, Component, Input} from '@angular/core';
import Swiper from 'swiper';
import {genSequence, util} from '../../../../shared/util';

@Component({
  selector: 'app-slider-base',
  templateUrl: './slider-base.component.html',
  styleUrls: ['./slider-base.component.scss']
})
export class SliderBaseComponent implements AfterViewInit {

  private _slideObject?: Swiper;
  private _options: SliderViewOptions = {
    id: `swiper-${util.randomInt(0, 10000)}`,
    slidesPerView: 3,
    slidesPerGroup: 3
  };
  idxBullets: number[] = [];
  currIndex = 0;

  get options(): SliderViewOptions {
    return this._options;
  }

  @Input()
  set options(options: SliderViewOptions) {
    this._options = options;
    this.idxBullets = genSequence(4, 0);
  }

  ngAfterViewInit(): void {
    const elemSwiper = document.getElementById(this.options.id);
    const maxHeightSlides = this.options.maxHeight ? `${this.options.maxHeight}px` : '100%';
    if (elemSwiper) {
      elemSwiper.style.setProperty('--slide-max-height', maxHeightSlides);
    }
    this._slideObject = new Swiper(
      `.${this.options.id}`,
      {
        loop: this.options.loop ?? true,
        slidesPerView: this.options.slidesPerView ?? 1,
        slidesPerGroup: this.options.slidesPerGroup ?? 1,
        spaceBetween: this.options.spaceBetween ?? 0,
        speed: this.options.speed ?? 250,
        breakpoints: this.options.breakpoints ?? undefined,
        loopFillGroupWithBlank: false,
        navigation: {
          nextEl: '.swiper__arrow--next',
          prevEl: '.swiper__arrow--prev',
        },
      });
  }

  goToIndexSlide(i: number) {
    if (this._slideObject) {
      (this._slideObject as Swiper).slideTo(i);
    }
  }
}

export interface SliderViewOptions {
  id: string;
  loop?: boolean;
  maxHeight?: number;
  pagination?: boolean;
  slidesPerGroup?: number;
  slidesPerView?: number;
  spaceBetween?: number;
  speed?: number;
  breakpoints?: SliderBreakpoint;
}

export interface SliderBreakpoint {
  [key: number]: {
    slidesPerView: number;
    spaceBetween?: number;
  };
}
