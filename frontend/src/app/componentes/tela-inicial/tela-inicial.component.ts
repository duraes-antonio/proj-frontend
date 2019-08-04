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
      "../../assets/card-1.jpeg",
      ""));
    this.componentes.push(new Cartao(
      "../../assets/card-2.jpeg",
      ""));
    this.componentes.push(new Cartao(
      "../../assets/card-3.jpeg",
      ""));

    this.contCartoes = this.componentes.filter(this.contCartao).length;
  }

  ngOnInit() { }

  contCartao(item: IComponente) {
    return item.tipo == ETipoComponente.CARTAO;
  }
}
