import {Component, Input, OnInit} from '@angular/core';
import Glide from '../../../../node_modules/@glidejs/glide';
import {ISequencia} from '../../interfaces/ISequencia';

@Component({
  selector: 'app-sequencia',
  templateUrl: './sequencia.component.html',
  styleUrls: ['./sequencia.component.scss']
})
export class SequenciaComponent implements OnInit {

  constructor() {  }

  @Input()
  set sequencia(sequencia: ISequencia<any>) {
    this._sequencia = sequencia;
    this._qtdSlides = this._sequencia.tamanho;
  }

  get idInstancia(): number {
    return SequenciaComponent._idInstancia;
  }

  public static _idInstancia = 0;
  private _glide: Glide;
  private _qtdSlides: number;
  private _ultPerView: number;
  private _ocultarBtnSlideAnt: boolean;
  private _ocultarBtnSlideProx: boolean;
  public _sequencia: ISequencia<any>;

  get ocultarBtnSlideAnt(): boolean {
    return this._ocultarBtnSlideAnt;
  }

  get ocultarBtnSlideProx(): boolean {
    return this._ocultarBtnSlideProx;
  }

  private gerenciarBotoesSequencia(glideObj: Glide) {

    const indiceUltVisivel = glideObj.index + glideObj._o.perView;

    if (glideObj._o.perView !== this._ultPerView) {
      glideObj.index = 0;
      this._ocultarBtnSlideProx = true;
    }

    console.log(this._sequencia, indiceUltVisivel);

    /*Se o índice do último slide exibido for igual ao tamanho da sequência,
     * ele é o último slide, oculte o botão de avançar p/ próximo slide*/
    this._ocultarBtnSlideProx = indiceUltVisivel >= this._qtdSlides;

    /*Se o primeiro slide exibido for o primeiro da sequência,
     * oculte o botão de voltar p/ slide anterior*/
    this._ocultarBtnSlideAnt = glideObj.index === 0;

    this._ultPerView = glideObj._o.perView;
  }

  private gerenciarDimCards() {

  }

  ngOnInit() {
    const refThis = this;

    document.addEventListener(
      'DOMContentLoaded',
      function () {
        const slider = document.getElementById(
          'glide-' + refThis._sequencia.id);

        /*Defina a configuração do Slider, instancie-o e o monte*/
        const opcoes = {
          animationDuration: 300,
          type: 'slider',
          rewind: false,
          bound: true,
          startAt: 0,
          perView: refThis._sequencia.tamanho > 4 ? 5 : refThis._sequencia.tamanho,
          gap: 5,
          breakpoints: {
            1000: {
              perView: 5
            },
            800: {
              perView: refThis._sequencia.tamanho > 3 ? 4 : refThis._sequencia.tamanho
            },
            640: {
              perView: refThis._sequencia.tamanho > 2 ? 3 : refThis._sequencia.tamanho
            },
            480: {
              perView: 2
            }
          }
        };

        refThis._glide = new Glide(slider, opcoes);
        refThis._glide.mount();

        refThis.gerenciarBotoesSequencia(refThis._glide);

        /*Sempre que a janela for redimensionada, verifique se os botões devem
        * estar habilitados */
        refThis._glide.on(
          ['run.after', 'resize'],
          function () {
            refThis.gerenciarBotoesSequencia(refThis._glide);
          }
        );
      }
    );
  }

  avancarSlide() {
    this._glide.go('>');
  }

  recuarSlide() {
    this._glide.go('<');
  }
}
