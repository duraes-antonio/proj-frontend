import {Component, OnInit} from '@angular/core';
import {IComponente} from "../../interfaces/IComponente";
import {ETipoComponente} from "../../enum/ETipoComponente";
import {Slider} from "../../modelos/Slider";
import {Cartao} from "../../modelos/Cartao";

@Component({
  selector: 'app-tela-inicial',
  templateUrl: './tela-inicial.component.html',
  styleUrls: ['./tela-inicial.component.scss']
})
export class TelaInicialComponent implements OnInit {

  public readonly tipoComponente = ETipoComponente;
  public readonly componentes: Array<IComponente>;

  constructor() {

    //TODO: Receber lista de componentes do banco
    this.componentes = new Array<IComponente>();
    this.componentes.push(new Slider());
    this.componentes.push(new Cartao("https://scontent-lht6-1.cdninstagram.com/vp/1cd892287dd2f1ba6559fa9b3750f3bd/5DB3C6F3/t51.2885-15/e35/59737008_551867965640304_3950936092854489092_n.jpg?_nc_ht=scontent-lht6-1.cdninstagram.com&se=7&ig_cache_key=MjAzOTQ4NTQ5NjU4NTA4MzQzNg%3D%3D.2", ""));
    this.componentes.push(new Cartao("https://scontent-lht6-1.cdninstagram.com/vp/b5fe4f442174b50b2904299dfd0251ee/5DB0EE9C/t51.2885-15/e35/66150361_395975211030092_2230026171372845445_n.jpg?_nc_ht=scontent-lht6-1.cdninstagram.com&se=7&ig_cache_key=MjA5Mzg2NTE0ODU3ODQ2MzE1MQ%3D%3D.2", ""));
    this.componentes.push(new Cartao("https://scontent.fvix2-2.fna.fbcdn.net/v/t1.0-9/26195844_1982461065354750_4754743224983297603_n.jpg?_nc_cat=102&_nc_oc=AQkj7KsVuM9JdDbPX_jI9pE-7_XeshLSSd7t0_c3l3RmxxjbGEEGN6isjhcMXfTEpLE&_nc_ht=scontent.fvix2-2.fna&oh=4d8dc3cd19fd138ec66ebeae0a2c3dec&oe=5DDF12BA", ""));
  }

  ngOnInit() { }
}
