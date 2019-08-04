import {Slide} from "./Slide";
import {ETipoComponente} from "../enum/ETipoComponente";
import {IComponente} from "../interfaces/IComponente";

export class Slider implements IComponente {

  public readonly tipo: ETipoComponente = ETipoComponente.SLIDER;

  private readonly id: number;
  public readonly slides: Array<Slide>;

  constructor() {
    this.slides = this.obterSlides();
  }

  //TODO: Substituir pelos slides recebidos do BACKEND
  private obterSlides(): Array<Slide> {

    let slides = new Array<Slide>();

    slides.push(
      new Slide(
        "../../assets/slide-1.jpg",
        "www.google.com")
    );

    slides.push(
      new Slide(
        "../../assets/slide-2.jpg",
        "www.google.com"));

    slides.push(
      new Slide(
        "../../assets/slide-3.jpg",
        "www.google.com"));

    slides.push(
      new Slide(
        "../../assets/slide-4.png",
        "www.google.com")
    );

    return slides;
  }
}
