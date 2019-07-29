import {Component, Input, OnInit} from '@angular/core';
import * as M from "materialize-css/dist/js/materialize";
import {Slider} from "../../modelos/Slider";

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {

  @Input() slider;

  /*Itens armazenados somente para evitar buscas e operações adicionais c/ DOM*/
  private static indUltimo: number;
  private static carrossel: any;

  constructor() { }

  ngOnInit() {
    console.log(this.slider);
    SliderComponent.indUltimo = 0;

    document.addEventListener(
      'DOMContentLoaded',
      function () {
        const elems = document.querySelectorAll('.carousel');
        M.Carousel.init(elems, {
          fullWidth: true,
          onCycleTo:

            function () {
              document
                .getElementById("indicador-" + SliderComponent.indUltimo)
                .classList.remove("indicador--ativo");

              let indiceSlide: number = +document
                .getElementsByClassName("carousel-item active")[0]
                .id.split("-")[1];

              document
                .getElementById("indicador-" + indiceSlide)
                .classList.add("indicador--ativo");

              SliderComponent.indUltimo = indiceSlide;
            }
        });

        SliderComponent.carrossel = M.Carousel.getInstance(elems[0]);
      });

    //A cada 3.5 segundos, passe para o próximo slide
    // setInterval(this.proximoSlide, 4000);
  }

  private proximoSlide() {
    //Remova o realce do indicador atual
    document.getElementById("indicador-" + SliderComponent.indUltimo)
      .classList.remove("indicador--ativo");

    SliderComponent.carrossel.next();
  }

  private atualizarIndicador(indice: number) {
    const indicAtivos = document.getElementsByClassName("indicador--ativo");

    /*Se o índice do slide desejado é diferente do atual*/
    if (indice != SliderComponent.indUltimo) {

      //Remova o realce do indicador atual
      document.getElementById("indicador-" + SliderComponent.indUltimo)
        .classList.remove("indicador--ativo");

      //Adicione o realce no indicador do índice recebido
      document.getElementById("indicador-" + indice)
        .classList.add("indicador--ativo");

      //Avance para o N-ésimo slide
      SliderComponent.carrossel.set(indice);
    }
  }
}
