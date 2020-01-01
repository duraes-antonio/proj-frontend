export function gerarSequencia(qtd: number, inicio: number): number[] {
  return Array(qtd).fill(0).map((x, i) => i + inicio);
}
