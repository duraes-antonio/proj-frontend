import {Component} from '@angular/core';
import {Slider} from '../../models/componentes/Slider';
import {ListProduct} from '../../models/componentes/ListProduct';
import {ListaCartao} from '../../models/componentes/ListaCartao';
import {SequenciaLoja} from '../../models/componentes/SequenciaLoja';

@Component({
  selector: 'app-tela-inicial',
  templateUrl: './tela-inicial.component.html',
  styleUrls: ['./tela-inicial.component.scss']
})
export class TelaInicialComponent {

  // TODO: Receber lista de componentes do banco
  public readonly sliders: Slider[] = [new Slider(1)];
  public readonly cartoes: ListaCartao[] = [new ListaCartao(1)];
  public readonly seqProdutos: ListProduct[] = [new ListProduct(1)];
  public readonly seqLojas: SequenciaLoja[] = [new SequenciaLoja(3)];
}
