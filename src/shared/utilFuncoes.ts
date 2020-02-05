export function genSequence(qtd: number, inicio: number): number[] {
  return Array(qtd).fill(0).map((x, i) => i + inicio);
}

export function calcAverage<T>(objs: T[], fnAccessProp: (obj: T) => number): number {
  return objs
    .map(obj => fnAccessProp(obj))
    .reduce((pv, cv) => pv + cv) / objs.length;
}
