import {Component, OnInit} from '@angular/core';
import {Slider} from '../../modelos/componentes/Slider';
import {SequenciaProduto} from '../../modelos/componentes/SequenciaProduto';
import {ListaCartao} from '../../modelos/componentes/ListaCartao';
import {SequenciaLoja} from '../../modelos/componentes/SequenciaLoja';

@Component({
  selector: 'app-tela-inicial',
  templateUrl: './tela-inicial.component.html',
  styleUrls: ['./tela-inicial.component.scss']
})
export class TelaInicialComponent implements OnInit {

  public readonly sliders: Array<Slider> = [];
  public readonly cartoes: Array<ListaCartao> = [];
  public readonly seqProdutos: Array<SequenciaProduto> = [];
  public readonly seqLojas: Array<SequenciaLoja> = [];

  constructor() {

    // TODO: Receber lista de componentes do banco
    this.sliders.push(new Slider(1));
    this.cartoes.push(new ListaCartao(1));
    this.seqProdutos.push(new SequenciaProduto(1));
    this.seqLojas.push(new SequenciaLoja(3));

  }

  ngOnInit() {
  }
}
