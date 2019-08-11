import {Component, Input, OnInit} from '@angular/core';
import {SequenciaProduto} from '../../modelos/SequenciaProduto';
import Glide from '../../../../node_modules/@glidejs/glide';

@Component({
  selector: 'app-seq-produto',
  templateUrl: './sequencia-produto.component.html',
  styleUrls: ['./sequencia-produto.component.scss']
})
export class SequenciaProdutoComponent implements OnInit {

  constructor() { }

  @Input()
  set sequencia(sequencia: SequenciaProduto) {
    this._sequencia = sequencia;
    SequenciaProdutoComponent._qtdSlides = this._sequencia.produtos.length;
  }

  private static _glide: Glide;
  private static _qtdSlides: number;
  private static _ocultarBtnSlideAnt: boolean;
  private static _ocultarBtnSlideProx: boolean;
  public _sequencia: SequenciaProduto;

  get ocultarBtnSlideAnt(): boolean {
    return SequenciaProdutoComponent._ocultarBtnSlideAnt;
  }

  get ocultarBtnSlideProx(): boolean {
    return SequenciaProdutoComponent._ocultarBtnSlideProx;
  }

  private static gerenciarBotoesSequencia() {

    const seqProd = SequenciaProdutoComponent;
    const glideObj = seqProd._glide;
    const indiceUltVisivel = glideObj.index + glideObj._o.perView;

    /*Se o índice do último slide exibido for igual ao tamanho da sequência,
     * ele é o último slide, oculte o botão de avançar p/ próximo slide*/
    if (glideObj._o.perView === seqProd._qtdSlides) {
      glideObj.index = 0;
      seqProd._ocultarBtnSlideProx = true;
    } else {
      seqProd._ocultarBtnSlideProx = indiceUltVisivel === seqProd._qtdSlides;
    }

    /*Se o primeiro slide exibido for o primeiro da sequência,
     * oculte o botão de voltar p/ slide anterior*/
    seqProd._ocultarBtnSlideAnt = glideObj.index === 0;
  }

  ngOnInit() {
    document.addEventListener(
      'DOMContentLoaded',
      function () {

        /*Defina a configuração do Slider, instancie-o e o monte*/
        const opcoes = {
          animationDuration: 300,
          type: 'slider',
          rewind: false,
          bound: true,
          startAt: 0,
          perView: (SequenciaProdutoComponent._qtdSlides > 4) ? 5 : 4,
          gap: 5,
          breakpoints: {
            1000: {
              perView: 5
            },
            800: {
              perView: 4
            },
            640: {
              perView: 3
            },
            480: {
              perView: 2
            }
          }
        };
        SequenciaProdutoComponent._glide = new Glide('.glide', opcoes);

        SequenciaProdutoComponent._glide.mount();

        SequenciaProdutoComponent.gerenciarBotoesSequencia();

        /*Sempre que a janela for redimensionada, verifique se os botões devem
        * estar habilitados */
        SequenciaProdutoComponent._glide.on(
          ['resize'], SequenciaProdutoComponent.gerenciarBotoesSequencia
        );

        SequenciaProdutoComponent._glide.on(
          ['run.after'], SequenciaProdutoComponent.gerenciarBotoesSequencia
        );
      }
    );
  }

  print(anterior: string) {
    alert(anterior);
  }

  avancarSlide() {
    SequenciaProdutoComponent._glide.go('>');
  }

  recuarSlide() {
    SequenciaProdutoComponent._glide.go('<');
  }
}
