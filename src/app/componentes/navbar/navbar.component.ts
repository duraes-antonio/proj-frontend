import {Component, OnInit} from '@angular/core';
import {Usuario} from '../../modelos/Usuario';
import {Notificacao} from '../../modelos/Notificacao';

@Component({
  selector: 'app-navbar',
  templateUrl: 'navbar.component.html',
  styleUrls: [
    'navbar.component.scss'
  ]
})
export class NavbarComponent implements OnInit {

  constructor() { }

  public exibirBusca: boolean;
  public exibirSidenav: boolean;
  public exibirNotificacoes: boolean;
  public usuarioAtual: Usuario;
  public notificacoes: Array<Notificacao>;
  public qtdNotifAtiva: number;

  ngOnInit() {
    this.exibirBusca = false;
    this.exibirNotificacoes = false;

    /*TODO: Alterar para receber os dados do usuário após login*/
    this.usuarioAtual = new Usuario(
      'Joana Maria Silva',
      'joana@email.com'
    );
    this.usuarioAtual.definirUrlAvatar(
      '../../assets/tea.png'
    );

    this.notificacoes = new Array<Notificacao>();
    this.qtdNotifAtiva = 7;

    for (let i = 0; i < 7; ++i) {
      this.notificacoes.push(
        new Notificacao(
          'Sua encomenda está a caminho! Acompanhe o estado de sua compra',
          new Date(),
          'www.google.com',
          Math.floor(Math.random() * 8)
        )
      );
    }
  }

  /**
   * Oculta a barra de busca se já estiver sendo exibida, senão, exibe-a.
   */
  public toggleBusca() {

    /*Se a barra já está sendo exibida, oculte-a. Se a barra está oculta, exiba-a*/
    this.exibirBusca = !this.exibirBusca;
  }

  /**
   * Oculta o menu lateral se já estiver sendo exibido, senão, exibe-o.
   */
  public toggleSidenav() {
    this.exibirSidenav = !this.exibirSidenav;
  }

  print(evento: string) {
    alert(evento);
  }

  /**
   * Oculta a lista de notificações se já estiver sendo exibida, senão, exibe-a.
   */
  public toggleListaNotificacoes() {
    this.exibirNotificacoes = !this.exibirNotificacoes;
  }

  /**
   * Marca uma notificação como lida ou como não lida, mudando seu visual e data de leitura.
   */
  public toggleNotificacao(notif: Notificacao) {
    notif.toggle();
    this.qtdNotifAtiva += notif.lida ? -1 : 1;
  }

  /**
   * Marca uma notificação como lida e atualiza o contador de notif.
   */
  public marcarNotificacaoComoLida(notif: Notificacao) {

    if (notif.lida !== true) {
      notif.marcarComoLida();
      this.qtdNotifAtiva -= 1;
    }
  }

  /**
   * Marca todas notificações como lidas e atualiza o contador
   */
  public marcarTodasNotificacoesComoLidas() {

    if (this.qtdNotifAtiva > 0) {
      for (const notif of this.notificacoes) {
        notif.marcarComoLida();
      }
      this.qtdNotifAtiva = 0;
    }
  }
}