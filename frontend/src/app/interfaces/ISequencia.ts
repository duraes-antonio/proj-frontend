import {IComponente} from './IComponente';

export interface ISequencia<T> extends IComponente {

  readonly id?: number;
  /**
   * Título da sequência a ser exibido para o usuário
   */
  readonly titulo: string;

  /**
   * Quantidade total de elementos contidos na sequência
   */
  readonly tamanho: number;

  readonly itens: Array<T>;
}
