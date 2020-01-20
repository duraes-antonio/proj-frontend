import {Component, OnInit} from '@angular/core';
import {Endereco} from '../../modelos/Endereco';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit {

  // TODO: Obter informações do Banco de dadps
  public info: Info = {
    cnpj: '69.035.540/0001-07',
    nomeFantasia: 'yugishop',
    razaoSocial: 'Yugi Comercio de Brinquedos',
    endereco: null
  };

  constructor() {
  }

  ngOnInit() {
  }

}

export class Info {
  public cnpj: string;
  public nomeFantasia: string;
  public razaoSocial: string;
  public endereco: Endereco;
}

