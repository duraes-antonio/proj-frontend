import {ETipoNotificacao} from '../enum/ETipoNotificacao';

export class Notificacao {

  public readonly id: number;
  public readonly texto: string;
  public readonly dataCriacao: Date;
  public readonly tipo: ETipoNotificacao;
  public readonly classeIcone: string;
  public readonly link: string;

  private _lida: boolean;

  private _dataLeitura?: Date;

  set lida(valor: boolean) {
    this._lida = valor;
  }

  get lida(): boolean {
    return this._lida;
  }

  get dataLeitura(): Date {
    return this._dataLeitura;
  }

  // TODO: Alterar para utilizar 'tipo' como ENUM
  // TODO: Alterar o ID para vir do banco
  constructor(
    texto: string, dataCriacao: Date, link: string, tipo: ETipoNotificacao
  ) {
    this.id = Math.floor(Math.random() * 1000);
    this.texto = texto;
    this.dataCriacao = dataCriacao;
    this.link = link;
    this._lida = false;
    this._dataLeitura = null;


    if (tipo === ETipoNotificacao.ATUALIZACAO_SENHA) {
      this.classeIcone = 'fas fa-key';
    } else if (tipo === ETipoNotificacao.COMPRA_EM_ENTREGA) {
      this.classeIcone = 'fas fa-shipping-fast';
    } else if (tipo === ETipoNotificacao.COMPRA_ENTREGUE) {
      this.classeIcone = 'fas fa-gift';
    } else if (tipo === ETipoNotificacao.COMPRA_SEPARADA) {
      this.classeIcone = 'fas fa-dolly';
    } else if (tipo === ETipoNotificacao.DUVIDA_RESPONDIDA) {
      this.classeIcone = 'fas fa-comments';
    } else if (tipo === ETipoNotificacao.PAGAMENTO_CONFIRMADO) {
      this.classeIcone = 'fas fa-hand-holding-usd';
    } else if (tipo === ETipoNotificacao.PAGAMENTO_DEVOLVIDO) {
      this.classeIcone = 'fas fa-piggy-bank';
    } else if (tipo === ETipoNotificacao.PAGAMENTO_PENDENTE) {
      this.classeIcone = 'fas fa-search-dollar';
    }
  }

  /**
   * Marca uma notificação como lida ou como não lida, atualiza sua data de leitura.
   */
  public toggle() {

    // Inverta a marcação lida p/ não lida (vice-versa)
    this._lida = !this._lida;

    // Atualize a data de leitura
    this._dataLeitura = this.lida ? new Date() : null;
  }

  /**
   * Marca a notificação como lida e define sua data de leitura
   */
  public marcarComoLida() {
    if (!this.lida) {
      this._lida = true;
      this._dataLeitura = new Date();
    }
  }

  /**
   * Desmarca a notificação como lida e anula sua data de leitura
   */
  public desmarcarComoLida() {
    this._lida = false;
    this._dataLeitura = null;
  }
}
