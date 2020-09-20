'use strict';
import {AfterViewInit, Component, Input} from '@angular/core';
import {SliderViewOptions} from '../slider-base/slider-base.component';
import {Sequence} from '../../../models/componentes/sequence';
import {Slide} from '../../../models/componentes/slide';

@Component({
  selector: 'app-slider-master',
  templateUrl: './slider-master.component.html',
  styleUrls: ['./slider-master.component.scss']
})
export class SliderMasterComponent implements AfterViewInit {

  sliderOptions?: SliderViewOptions;

  private _slider!: Sequence<Slide>;

  @Input() externalUrls = true;

  get slider(): Sequence<Slide> {
    return this._slider;
  }

  @Input()
  set slider(slide: Sequence<Slide>) {
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

  formatUrl(url: string, external = true): string {
    const prefix = 'https://'
    return external ? (url.startsWith(prefix) ? url : `${prefix}${url}`) : url;
  }

  openUrl(url: string, external = false) {
    window.open(url, external ? '_blank' : '_self');
  }
}
