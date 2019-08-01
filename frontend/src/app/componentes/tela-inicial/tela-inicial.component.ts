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
  public readonly contCartoes;

  constructor() {

    //TODO: Receber lista de componentes do banco
    this.componentes = new Array<IComponente>();
    this.componentes.push(new Slider());
    this.componentes.push(new Cartao(
      "https://www.yugioh-world.com/wp-content/uploads/2016/04/tcg_may2016_spring_update_header-672x372.png",
      ""));
    this.componentes.push(new Cartao(
      "https://thepopinsider.com/wp-content/uploads/2019/02/Yu-Gi-Oh-New.jpg",
      ""));
    this.componentes.push(new Cartao(
      "http://nerdreactor.com/wp-content/uploads/2016/01/2015-YGO_day_GameMat-vassal-lowres.jpg",
      ""));

    this.contCartoes = this.componentes.filter(this.contCartao).length;
  }

  ngOnInit() { }

  contCartao(item: IComponente) {
    return item.tipo == ETipoComponente.CARTAO;
  }
}
