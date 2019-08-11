import {Component, Input, OnInit} from '@angular/core';
import * as M from 'materialize-css/dist/js/materialize';
import {Slider} from '../../modelos/Slider';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {

  constructor() { }

  /*Itens armazenados somente para evitar buscas e operações adicionais c/ DOM*/
  private static indUltimo: number;
  private static carrossel: any;

  @Input() slider;

  ngOnInit() {
    SliderComponent.indUltimo = 0;

    document.addEventListener(
      'DOMContentLoaded',
      function () {
        const elems = document.querySelectorAll('.carousel');
        M.Carousel.init(elems, {
          fullWidth: true,
          indicators: true
        });

        SliderComponent.carrossel = M.Carousel.getInstance(elems[0]);
      });

    // A cada 3.5 segundos, passe para o próximo slide
    // setInterval(this.proximoSlide, 4000);

  }

  private avancarSlide() {
    SliderComponent.carrossel.next();
  }

  private voltarSlide() {
    SliderComponent.carrossel.prev();
  }
}
