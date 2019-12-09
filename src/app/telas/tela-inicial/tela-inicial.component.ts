import {AfterViewInit, Component, OnInit} from '@angular/core';
import {IComponente} from '../../interfaces/IComponente';
import {ETipoComponente} from '../../enum/ETipoComponente';
import {Slider} from '../../modelos/componentes/Slider';
import {SequenciaProduto} from '../../modelos/componentes/SequenciaProduto';
import {ListaCartao} from '../../modelos/componentes/ListaCartao';
import {SequenciaLoja} from '../../modelos/componentes/SequenciaLoja';

@Component({
  selector: 'app-tela-inicial',
  templateUrl: './tela-inicial.component.html',
  styleUrls: ['./tela-inicial.component.scss']
})
export class TelaInicialComponent implements OnInit, AfterViewInit {

  public readonly tipoComponente = ETipoComponente;
  public readonly componentes: Array<IComponente>;

  public exibirParceiros = false;

  constructor() {

    // TODO: Receber lista de componentes do banco
    this.componentes = new Array<IComponente>();
    this.componentes.push(new Slider(1));
    this.componentes.push(new ListaCartao(1));
    this.componentes.push(new SequenciaProduto(1));
    this.componentes.push(new SequenciaLoja(3));

  }

  ngOnInit() { }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.exibirParceiros = true;
    });
  }
}
