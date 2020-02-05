import {Component, Input, OnInit} from '@angular/core';
import {Slider} from '../../models/componentes/Slider';
import {Carousel} from '../../../../node_modules/materialize-css/dist/js/materialize.min.js';


@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {

  constructor() {
  }

  /*Itens armazenados somente para evitar buscas e operações adicionais c/ DOM*/
  private static indUltimo: number;
  private static carrossel: Carousel;

  @Input() slider: Slider;

  ngOnInit() {
    SliderComponent.indUltimo = 0;

    if (document.readyState.toLowerCase() !== 'complete') {
      document.addEventListener(
        'DOMContentLoaded',
        () => {
          this.iniciarComponente();
        }
      );
    } else {
      setTimeout(
        () => {
          this.iniciarComponente();
        },
        50
      );
    }

    // TODO: Ativar slider após finalizar implementação
    // A cada 3.5 segundos, passe para o próximo slide
    // setInterval(this.proximoSlide, 4000);
  }

  private iniciarComponente() {

    const elems = document.querySelectorAll('.carousel');
    Carousel.init(
      elems,
      {
        fullWidth: true,
        indicators: true
      }
    );

    SliderComponent.carrossel = Carousel.getInstance(elems[0]);
  }

  public avancarSlide() {
    SliderComponent.carrossel.next();
  }

  public voltarSlide() {
    SliderComponent.carrossel.prev();
  }
}
