import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit {

  //TODO: Obter informações do Banco de dadps
  public info: Info = {
    cnpj: '69.035.540/0001-07',
    nomeFantasia: 'yugishop',
    razaoSocial: 'Yugi Comercio de Brinquedos',
    endereco: {
      lograd: 'Rua Hermilo Alves',
      numero: 45,
      cep: '27161-587',
      bairro: 'Jardim Tropical',
      cidade: 'Laranjeiras',
      estado: 'ES'
    }
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

export class Endereco {
  public lograd: string;
  public numero: number;
  public cep: string;
  public bairro: string;
  public cidade: string;
  public estado: string;
}
