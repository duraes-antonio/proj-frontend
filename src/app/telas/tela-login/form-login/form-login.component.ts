import {Component, OnInit} from '@angular/core';
import {ModalRecupSenhaComponent} from '../../../components/modais/modal-recup-senha/modal-recup-senha.component';

@Component({
  selector: 'app-form-login',
  templateUrl: './form-login.component.html',
  styleUrls: ['./form-login.component.scss']
})
export class FormLoginComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  exibirModalRecuperacao() {
    ModalRecupSenhaComponent.exibir();
  }
}
