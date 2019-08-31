import {Component, OnDestroy, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'app-tela-login',
  templateUrl: './tela-login.component.html',
  styleUrls: ['./tela-login.component.scss']
})
export class TelaLoginComponent implements OnInit {

  private idUltimaAba: string;

  constructor(
    private readonly router: Router) {

    this.router.events.subscribe(
      (val) => {

        if (val instanceof NavigationEnd) {
          const urlParts = val.url.split('/');

          if (urlParts[urlParts.length - 1] !== this.idUltimaAba) {
            this.marcarAba(urlParts[urlParts.length - 1]);
          }
        }
      }
    );
  }

  ngOnInit() {
  }

  marcarAba(idAba: string) {

    if (!!this.idUltimaAba) {
      document.getElementById(this.idUltimaAba).classList.remove('aba--ativa');
    }

    document.getElementById(idAba).classList.add('aba--ativa');
    this.idUltimaAba = idAba;
  }
}
