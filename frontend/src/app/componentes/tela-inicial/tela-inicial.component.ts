import {Component, OnInit} from '@angular/core';
import {IComponente} from "../../interfaces/IComponente";
import {ETipoComponente} from "../../enum/ETipoComponente";
import {Slider} from "../../modelos/Slider";
import {Cartao} from "../../modelos/Cartao";
import {SequenciaProdutoComponent} from "../seq-produto/sequencia-produto.component";
import {Produto} from "../../modelos/Produto";
import {SequenciaProduto} from "../../modelos/SequenciaProduto";
import {ListaCartao} from "../../modelos/ListaCartao";

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
    this.componentes.push(new Slider(1));
    this.componentes.push(new ListaCartao(1));
    this.componentes.push(new SequenciaProduto(1));
  }

  ngOnInit() { }
}
