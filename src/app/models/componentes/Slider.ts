'use strict';
import {Slide} from '../Slide';
import {ETipoComponente} from '../../enum/ETipoComponente';
import {ISequencia} from '../../interfaces/ISequencia';
import {DataTests} from '../../../shared/dataTests';

export class Slider implements ISequencia<Slide> {

  public readonly id: number;
  public readonly itens: Slide[];
  public readonly tipo: ETipoComponente = ETipoComponente.SLIDER;
  public readonly titulo: string;

  get tamanho(): number {
    return !!this.itens ? this.itens.length : 0;
  }

  constructor(id: number, titulo?: string, itens?: Slide[]) {
    this.id = id;
    this.titulo = titulo;
    this.itens = DataTests.slides;
  }
}
