'use strict';
import {AfterViewInit, Component, Input} from '@angular/core';
import {Slider} from '../../models/componentes/Slider';
import Glide from '@glidejs/glide';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements AfterViewInit {

  @Input() slider: Slider;
  public currIndex = 0;
  private _glide: Glide;

  ngAfterViewInit(): void {
    const options = {
      animationDuration: 300,
      type: 'carousel',
      bound: true,
      startAt: 0,
      perView: 1,
    };
    const glideElem = document.getElementById('glide');

    /* Defina o número de slides (contando com as duas cópias) p/ calcular a largura
    * máxima de cada slide*/
    const sliderElem = document.getElementById(`slider-${this.slider.id}`);
    sliderElem.style.setProperty('--slides-lenght', `${this.slider.tamanho + 2}`);

    this._glide = new Glide(glideElem, options).mount();

    /*Após cada movimento, atualize o índice do slide atual p/ estilizar o indicador*/
    this._glide.on(['move.after'], () => {
      this.currIndex = this._glide.index;
    });
  }

  goToIndexSlide(i: number) {
    this._glide.go(`=${i}`);
  }
}
