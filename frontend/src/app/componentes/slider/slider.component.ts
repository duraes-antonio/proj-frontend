import { Component, OnInit } from '@angular/core';
import * as M from "materialize-css/dist/js/materialize";

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    document.addEventListener(
      'DOMContentLoaded',
      function () {
        let elems = document.querySelectorAll('.carousel');
        M.Carousel.init(elems, {
          fullWidth: true,
          indicators: true
        });
      });

    //A cada 3.5 segundos, passe para o próximo slide
    // setInterval(this.proximoSlide, 3500);
  }

  private proximoSlide() {
    var elems = document.querySelectorAll('.carousel');
    M.Carousel.getInstance(elems[0]).next();
  }
}
