import {Component, Input, OnInit} from '@angular/core';
import {SequenciaProduto} from "../../modelos/SequenciaProduto";
import Glide, {Controls} from "../../../../node_modules/@glidejs/glide";

@Component({
  selector: 'app-seq-produto',
  templateUrl: './sequencia-produto.component.html',
  styleUrls: ['./sequencia-produto.component.scss']
})
export class SequenciaProdutoComponent implements OnInit {

  constructor() { }
  public _sequencia: SequenciaProduto;

  @Input()
  set sequencia (sequencia: SequenciaProduto) {
    this._sequencia = sequencia;
  }

  ngOnInit() {
    document.addEventListener(
      'DOMContentLoaded',
      function () {
        const opcoes = {
          animationDuration: 300,
          type: 'slider',
          rewind: false,
          bound: true,
          startAt: 0,
          perView: 5,
          gap: 10,
          breakpoints: {
            800: {
              perView: 2
            },
            480: {
              perView: 1
            }
          }
        };


        let glide = new Glide('.glide', opcoes);
        glide.mount();
      }
    );
  }
}
