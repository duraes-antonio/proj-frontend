export function genSequence(qtd: number, inicio: number): number[] {
  return Array(qtd).fill(0).map((x, i) => i + inicio);
}

export function calcAverage<T>(
  objs: T[], fnAccessProp: (obj: T) => number, roundN?: number
): number {
  const avg = objs
    .map(obj => fnAccessProp(obj))
    .reduce((pv, cv) => pv + cv) / objs.length;
  return roundN ? +avg.toFixed(roundN) : avg;
}

export function randomFloat(
  min: number = 0, max: number = Number.MAX_SAFE_INTEGER): number {
  return (Math.random() * (max - min)) + min;
}

export function randomInt(
  min: number = 0, max: number = Number.MAX_SAFE_INTEGER): number {
  return Math.floor(Math.random() * (max - min)) + min;
}

export function randomBoolean(): boolean {
  return Math.random() >= 0.5;
}
