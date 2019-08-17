import {Component, Input, OnInit} from '@angular/core';
import {Carousel} from '../../../../node_modules/materialize-css/dist/js/materialize.min.js';
import {Slider} from '../../modelos/componentes/Slider';

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

  @Input() slider: Slider;

  ngOnInit() {
    SliderComponent.indUltimo = 0;

    document.addEventListener(
      'DOMContentLoaded',
      function () {
        const elems = document.querySelectorAll('.carousel');
        Carousel.init(elems, {
          fullWidth: true,
          indicators: true
        });

        SliderComponent.carrossel = Carousel.getInstance(elems[0]);
      });

    // A cada 3.5 segundos, passe para o próximo slide
    // setInterval(this.proximoSlide, 4000);

  }

  public avancarSlide() {
    SliderComponent.carrossel.next();
  }

  public voltarSlide() {
    SliderComponent.carrossel.prev();
  }
}
