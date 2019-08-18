import {Component, Input, OnInit} from '@angular/core';
import {Carousel} from '../../../../node_modules/materialize-css/dist/js/materialize.min.js';
import {Slider} from '../../modelos/componentes/Slider';

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
  private static carrossel: any;

  @Input() slider: Slider;

  ngOnInit() {
    SliderComponent.indUltimo = 0;
    const refThis = this;

    if (document.readyState.toLowerCase() !== 'complete') {
      document.addEventListener(
        'DOMContentLoaded',
        function () {
          refThis.iniciarComponente();
        }
      );
    } else {
      setTimeout(
        function() {
          refThis.iniciarComponente();
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
