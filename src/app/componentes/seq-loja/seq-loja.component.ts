import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {SequenciaLoja} from '../../modelos/componentes/SequenciaLoja';

@Component({
  selector: 'app-seq-lojas',
  templateUrl: './seq-loja.component.html',
  styleUrls: ['./seq-loja.component.scss']
})
export class SeqLojaComponent implements OnInit, AfterViewInit {

  constructor() { }

  @Input()
  set sequencia(sequencia: SequenciaLoja) {
    this._sequencia = sequencia;
  }

  public _sequencia: SequenciaLoja;

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    /*FIX: código para evitar o aparecimento repentino das logos das lojas
    * parceiras no topo do site. Isso ocorre devido as logos possuirem o
    * atributo 'position: abosulute' e suas div de fundo ainda não terem
    * carregadas. Conhecido efeito 'Jequiti'*/
    setTimeout(() => {
      const logos: HTMLCollectionOf<Element> = document.getElementsByClassName('area-logo');
      for (let i = 0, tam = logos.length; i < tam; ++i) {
        (logos[i] as HTMLElement).style.display = 'flex';
      }
    });
  }
}
