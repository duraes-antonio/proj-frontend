import {Slide} from './Slide';
import {ETipoComponente} from '../enum/ETipoComponente';
import {ISequencia} from '../interfaces/ISequencia';

export class Slider implements ISequencia {

  public readonly titulo: string;
  public readonly tipo: ETipoComponente = ETipoComponente.SLIDER;

  private readonly id: number;
  public readonly slides: Array<Slide>;

  constructor(id: number) {
    this.slides = Slider.obterSlidesMock();
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
