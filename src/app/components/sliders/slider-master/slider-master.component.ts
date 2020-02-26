'use strict';
import {AfterViewInit, Component, Input} from '@angular/core';
import {Slider} from '../../../models/componentes/slider';

@Component({
  selector: 'app-slider-master',
  templateUrl: './slider-master.component.html',
  styleUrls: ['./slider-master.component.scss']
})
export class SliderMasterComponent implements AfterViewInit {

  @Input() slider?: Slider;

  readonly glideOptions = {
    animationDuration: 300,
    type: 'carousel',
    bound: true,
    startAt: 0,
    perView: 1,
  };

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
        `${this.slider.lenght + 2}`
      );
    }
  }
}
