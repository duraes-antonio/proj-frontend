'use strict';
import {Component, Input, OnInit} from '@angular/core';
import {Slider} from '../../models/componentes/Slider';
import Glide from '@glidejs/glide';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {
  private _opcoes;
  private _glide;
  private _qtdSlides;

  private _slider;

  get slider() {
    return this._slider;
  }

  @Input()
  set slider(slider: Slider) {
    this._slider = slider;
    this._qtdSlides = slider.itens.length;
  }

  ngOnInit() {
    this._opcoes = {
      animationDuration: 300,
      type: 'carousel',
      bound: true,
      startAt: 0,
      perView: 1,
    };

    setTimeout(this.iniciarComponente);
  }

  private iniciarComponente() {
    const sliderGlide = document.getElementById('glide');
    this._glide = new Glide(sliderGlide, this._opcoes);
    this._glide.mount();

    // this.gerenciarBotoesSequencia(this._glide);
    //
    // /*Sempre que a janela for redimensionada, verifique se os botões devem
    // * estar habilitados */
    // this._glide.on(
    //   ['run.after', 'resize'],
    //   () => {
    //     this.gerenciarBotoesSequencia(this._glide);
    //   }
    // );
  }

  public avancarSlide() {
    // SliderComponent.carrossel.next();
  }

  public voltarSlide() {
    // SliderComponent.carrossel.prev();
  }
}
