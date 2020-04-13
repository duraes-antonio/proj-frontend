import {FormGroup} from '@angular/forms';

export function genSequence(qtd: number, start: number): number[] {
  return Array(qtd).fill(0).map((x, i) => i + start);
}

export function calcAverage<T>(
  objs: T[], fnAccessProp: (obj: T) => number, roundN?: number
): number {
  const avg = objs
    .map(obj => fnAccessProp(obj))
    .reduce((pv, cv) => pv + cv) / objs.length;
  return roundN ? +avg.toFixed(roundN) : avg;
}

export function filterByText<T>(
  term: string, list: T[], fnAcessPropText: (obj: T) => string
): T[] {
  if (term) {
    const termLower = term ? term.toLowerCase() : '';
    return list.filter((obj) => fnAcessPropText(obj)
      .toLowerCase()
      .includes(termLower)
    );
  } else {
    return list;
  }
}

export function randomFloat(
  min = 0, max: number = Number.MAX_SAFE_INTEGER): number {
  return (Math.random() * (max - min)) + min;
}

export function extractPatchFromFormGroup(oldObject: object, fGroup: FormGroup): any {
  const fieldsModified: any = {};
  Object.keys(oldObject).forEach((key: string) => {
    if (fGroup.controls[key] && Reflect.get(oldObject, key) !== fGroup.controls[key].value) {
      fieldsModified[key] = fGroup.controls[key].value;
    }
  });
  return fieldsModified;
}

export function getObjectFromFormGroup<T>(fGroup: FormGroup): T {
  const object: any = {};
  Object.keys(fGroup.controls).forEach((key: string) => {
    if (fGroup.controls[key]) {
      object[key] = fGroup.controls[key].value;
    }
  });
  return object;
}

export function randomInt(
  min = 0, max: number = Number.MAX_SAFE_INTEGER): number {
  return Math.floor(Math.random() * (max - min)) + min;
}

export function randomBoolean(): boolean {
  return Math.random() >= 0.5;
}

export const util = {
  calcAverage: calcAverage,
  getObjectFromFormGroup: getObjectFromFormGroup,
  getPatchFromFormGroup: extractPatchFromFormGroup,
  filterByText: filterByText,
  genSequence: genSequence,
  randomFloat: randomFloat,
  randomInt: randomInt,
  randomBoolean: randomBoolean,
};
