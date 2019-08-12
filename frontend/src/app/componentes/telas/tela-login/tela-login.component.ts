import {Component, OnInit} from '@angular/core';
// import * as M from 'materialize-css';
// import * as M from '../../../../../node_modules/materialize-css/dist/js/materialize.min.js';

@Component({
  selector: 'app-tela-login',
  templateUrl: './tela-login.component.html',
  styleUrls: ['./tela-login.component.scss']
})
export class TelaLoginComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  //   document.addEventListener(
  //     'DOMContentLoaded',
  //     function () {
  //       const elems = document.getElementById('tabs');
  //       M.Tabs.init(
  //         elems,
  //         {
  //           duration: 100
  //         }
  //       );
  //
  //       // const tabs = M.Tabs.getInstance(elems[0]);
  //
  //     }
  //   );
  }

}
