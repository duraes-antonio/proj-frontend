import {Endereco} from './Endereco';
import {ItemPedido} from './ItemProduto';
import {Produto} from './Produto';

export class Compra {

  public readonly data: Date;
  public readonly estado: ECompraEstado;
  public readonly custoItens: number;
  public readonly custoEntrega: number;
  public readonly precoTotal: number;
  public readonly enderecoDestino: Endereco;
  public readonly dataEntrega: Date;
  public readonly itens: ItemPedido[] = [];
  public readonly produtos: Produto[] = [];

  constructor(
    data: Date, custoItens: number, custoFrete: number, estado: ECompraEstado) {
    this.data = data;
    this.custoEntrega = custoFrete;
    this.custoItens = custoItens;
    this.estado = estado;
  }

  /**Calcular o preço total (frete com preço dos itens) da compra
   * @return Preço total (preço dos itens e preço da entrega) em reais da compra
   */
  public calcularTotal(): number {
    return this.custoItens + this.custoEntrega;
  }

  /**Calcular o volume em centímetros cúbicos de todos itens da compra
   * @return Volume em centímetros cúbicos que os itens ocupam
   */
  public calcularVolumeItens(): number {
    // TODO: Implementar
    return 0;
  }

  /**Calcula o preço de entrega da compra atual considerando suas dimensões e peso
   * @return Preço total da entrega, em reais
   */
  public calcularEntrega(): number {
    // TODO: Implementar
    return 0;
  }
}

export enum ECompraEstado {
  CANCELADA,
  DEVOLVIDA,
  ENTREGUE,
  EM_PREPARO
}
