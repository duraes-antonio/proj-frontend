import {Slide} from './Slide';
import {ETipoComponente} from '../enum/ETipoComponente';
import {ISequencia} from '../interfaces/ISequencia';

export class Slider implements ISequencia<Slide> {

  public readonly titulo: string;
  public readonly itens: Array<Slide>;

  get tamanho(): number {
    return !!this.itens ? this.itens.length : 0;
  }

  public readonly tipo: ETipoComponente = ETipoComponente.SLIDER;
  public readonly id: number;

  constructor(id: number) {
    this.itens = Slider.obterSlidesMock();
  }

  // TODO: Substituir pelos slides recebidos do BACKEND
  private static obterSlidesMock(): Array<Slide> {

    const slides = new Array<Slide>();

    slides.push(
      new Slide(
        '../../assets/slide-1.jpg',
        'www.google.com',
        'Card - Dragão Branco de Olhos Azuis')
    );

    slides.push(
      new Slide(
        '../../assets/slide-2.jpg',
        'www.google.com'));

    slides.push(
      new Slide(
        '../../assets/slide-3.jpg',
        'www.google.com'));

    slides.push(
      new Slide(
        '../../assets/slide-4.jpeg',
        'www.google.com')
    );

    return slides;
  }
}
