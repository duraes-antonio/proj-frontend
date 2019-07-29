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
        "https://scontent.fvix2-2.fna.fbcdn.net/v/t1.0-9/26195844_1982461065354750_4754743224983297603_n.jpg?_nc_cat=102&_nc_oc=AQkj7KsVuM9JdDbPX_jI9pE-7_XeshLSSd7t0_c3l3RmxxjbGEEGN6isjhcMXfTEpLE&_nc_ht=scontent.fvix2-2.fna&oh=4d8dc3cd19fd138ec66ebeae0a2c3dec&oe=5DDF12BA",
        "www.google.com",
        "Cards com até 75% de desconto",
        "Não obstante, a execução dos pontos do programa acarreta um processo de reformulação e modernização dos conhecimentos estratégicos para atingir a excelência.",
        "GOTO")
    );

    slides.push(
      new Slide(
        "https://scontent-lht6-1.cdninstagram.com/vp/1cd892287dd2f1ba6559fa9b3750f3bd/5DB3C6F3/t51.2885-15/e35/59737008_551867965640304_3950936092854489092_n.jpg?_nc_ht=scontent-lht6-1.cdninstagram.com&se=7&ig_cache_key=MjAzOTQ4NTQ5NjU4NTA4MzQzNg%3D%3D.2",
        "www.google.com"));

    slides.push(
      new Slide(
        "https://scontent-lht6-1.cdninstagram.com/vp/b5fe4f442174b50b2904299dfd0251ee/5DB0EE9C/t51.2885-15/e35/66150361_395975211030092_2230026171372845445_n.jpg?_nc_ht=scontent-lht6-1.cdninstagram.com&se=7&ig_cache_key=MjA5Mzg2NTE0ODU3ODQ2MzE1MQ%3D%3D.2",
        "www.google.com"));

    slides.push(
      new Slide(
        "https://yugiohblog.konami.com/br/wp-content/uploads/2018/04/Promo%C3%A7%C3%A3o-Artes-Perdidas.png",
        "www.google.com",
        "Cards com até 50% de desconto",
        "Compre agora cards com até metade do preço OFF! Somente nas N primeiras compras.",
        "Compra cards")
    );

    return slides;
  }
}
