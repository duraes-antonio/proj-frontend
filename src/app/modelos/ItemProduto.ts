import {FatalError} from 'tslint/lib/error';

export class ItemPedido {

  public readonly id: number;
  public readonly quantidade: number;
  public readonly precoUnidade: number;
  public readonly idProduto: number;

  constructor(qtd: number, precoUnitario: number, idProduto: number) {
    this.quantidade = qtd;
    this.precoUnidade = precoUnitario;
    this.idProduto = idProduto;
  }

  public calcularDimensoes() {
    /*TODO: Implementar*/
    throw new Error('Não implementado');
  }
}
