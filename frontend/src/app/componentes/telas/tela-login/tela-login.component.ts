import {Component, OnInit} from '@angular/core';
import {Tabs} from '../../../../../node_modules/materialize-css/dist/js/materialize.min.js';

@Component({
  selector: 'app-tela-login',
  templateUrl: './tela-login.component.html',
  styleUrls: ['./tela-login.component.scss']
})
export class TelaLoginComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
    const _this = this;
    document.addEventListener(
      'DOMContentLoaded',
      function () {
        const elems = document.getElementById('tabs');
        Tabs.init(
          elems,
          {
            duration: 100,
            onShow: _this.alterarCorIndicador
          });
        _this.alterarCorIndicador();
      }
    );
  }

  private alterarCorIndicador() {
    const aba = document.getElementsByClassName('indicator');

    if (aba.length > 0) {
      (<HTMLElement>aba[0]).style.backgroundColor = 'DodgerBlue';
    }

  }
}
