import {Component, Input, OnInit} from '@angular/core';
import Glide from '../../../../node_modules/@glidejs/glide';
import {ISequencia} from '../../interfaces/ISequencia';

@Component({
  selector: 'app-sequencia',
  templateUrl: './sequencia.component.html',
  styleUrls: ['./sequencia.component.scss']
})
export class SequenciaComponent implements OnInit {

  constructor() {
  }

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
  private _opcoes;

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

    /*Se o índice do último slide exibido for igual ao tamanho da sequência,
     * ele é o último slide, oculte o botão de avançar p/ próximo slide*/
    this._ocultarBtnSlideProx = indiceUltVisivel >= this._qtdSlides;

    /*Se o primeiro slide exibido for o primeiro da sequência,
     * oculte o botão de voltar p/ slide anterior*/
    this._ocultarBtnSlideAnt = glideObj.index <= 0;

    this._ultPerView = glideObj._o.perView;
  }

  ngOnInit() {
    this._opcoes = {
      animationDuration: 300,
      type: 'slider',
      rewind: false,
      bound: true,
      startAt: 0,
      perView: this._sequencia.tamanho > 4 ? 5 : this._sequencia.tamanho,
      gap: 10,
      breakpoints: {
        1920: {
          perView: this._sequencia.tamanho > 7 ? 8 : this._sequencia.tamanho
        },
        1600: {
          perView: this._sequencia.tamanho > 6 ? 7 : this._sequencia.tamanho
        },
        1440: {
          perView: this._sequencia.tamanho > 5 ? 6 : this._sequencia.tamanho
        },
        1280: {
          perView: this._sequencia.tamanho > 4 ? 5 : this._sequencia.tamanho
        },
        960: {
          perView: this._sequencia.tamanho > 3 ? 4 : this._sequencia.tamanho
        },
        640: {
          perView: this._sequencia.tamanho > 2 ? 3 : this._sequencia.tamanho
        },
        480: {
          perView: 2
        },
        360: {
          perView: 1
        }
      }
    };

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
  }

  private iniciarComponente() {

    const sliderGlide = document.getElementById('glide-' + this._sequencia.id);

    /*Defina a configuração do Slider, instancie-o e o monte*/
    this._glide = new Glide(sliderGlide, this._opcoes);
    this._glide.mount();

    this.gerenciarBotoesSequencia(this._glide);

    /*Sempre que a janela for redimensionada, verifique se os botões devem
    * estar habilitados */
    this._glide.on(
      ['run.after', 'resize'],
      () => {
        this.gerenciarBotoesSequencia(this._glide);
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
