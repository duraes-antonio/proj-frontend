'use strict';
import {AfterViewInit, Component, Input} from '@angular/core';
import {ListSlide} from '../../../models/componentes/slider';
import {SliderViewOptions} from '../slider-base/slider-base.component';

@Component({
  selector: 'app-slider-master',
  templateUrl: './slider-master.component.html',
  styleUrls: ['./slider-master.component.scss']
})
export class SliderMasterComponent implements AfterViewInit {

  sliderOptions?: SliderViewOptions;

  private _slider!: ListSlide;

  get slider(): ListSlide {
    return this._slider;
  }

  @Input()
  set slider(slide: ListSlide) {
    this._slider = slide;
    this.sliderOptions = {
      id: `master-${slide.id}`,
      loop: true
    };
  }

  ngAfterViewInit(): void {

    if (!this.slider) {
      throw new Error('O Slider recebido não pode ser nulo!');
    }

    /* Defina o número de slides (contando com as duas cópias) p/ calcular a largura
    * máxima de cada slide*/
    const sliderElem = document.getElementById(`slide-${this.slider.id}`);

    if (sliderElem && sliderElem.parentElement) {
      sliderElem.parentElement.style.setProperty(
        '--slides-lenght',
        `${this.slider.items.length}`
      );
    }
  }
}
