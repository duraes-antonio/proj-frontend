import {Component, OnDestroy, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'app-tela-login',
  templateUrl: './tela-login.component.html',
  styleUrls: ['./tela-login.component.scss']
})
export class TelaLoginComponent implements OnInit, OnDestroy {

  private idUltimaAba: string;
  private rotasEventosSub;

  constructor(
    private readonly router: Router) {

    this.rotasEventosSub = this.router.events.subscribe(
      (val) => {

        if (val instanceof NavigationEnd) {
          const urlParts = val.urlAfterRedirects.split('/');

          if (urlParts[urlParts.length - 1] !== this.idUltimaAba) {
            this.marcarAba(urlParts[urlParts.length - 1]);
          }
        }
      }
    );
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.rotasEventosSub.unsubscribe();
  }

  marcarAba(idAba: string) {

    if (!!this.idUltimaAba) {
      document.getElementById(this.idUltimaAba).classList.remove('aba--ativa');
    }

    const abaAtual = document.getElementById(idAba);

    if (!!abaAtual) {
      abaAtual.classList.add('aba--ativa');
    }

    this.idUltimaAba = idAba;
  }
}
