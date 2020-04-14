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

export function clearEmptyFields(obj: any): any {
  if (!(obj instanceof Object)) {
    return obj;
  }

  const objClean: any = {};
  const emptys = [null, undefined, ''];

  Object.keys(obj).forEach(k => {
    if (emptys.indexOf(obj[k]) < 0) {
      if (obj[k] instanceof Array && obj[k].length) {
        const arrayClean = obj[k][0] instanceof Object
          ? (obj[k] as Array<any>)
            .map(item => clearEmptyFields(item))
            .filter(item => Object.keys(item).length > 0)
          : [...obj[k]];

        if (arrayClean.length) {
          objClean[k] = arrayClean;
        }
      } else if (obj[k] instanceof Object) {
        const subObjectClean = clearEmptyFields(obj[k]);

        if (Object.keys(subObjectClean).length > 0) {
          objClean[k] = subObjectClean;
        }
      } else {
        objClean[k] = obj[k];
      }
    }
  });
  return objClean;
}

export function primitiveFieldsToString(obj: any): any {
  const objTransformed: any = {};

  if (!(obj instanceof Object || obj instanceof Array)) {
    return obj.toString();
  }

  Object.keys(obj).forEach(key => {
    if (obj[key] instanceof Array) {
      objTransformed[key] = (obj[key] as Array<any>)
        .map(item => primitiveFieldsToString(item));
    } else if (obj[key] instanceof Object) {
      objTransformed[key] = primitiveFieldsToString(obj[key]);
    } else {
      objTransformed[key] = obj[key].toString();
    }
  });
  return objTransformed;
}

export const util = {
  calcAverage: calcAverage,
  clearEmptyFields: clearEmptyFields,
  filterByText: filterByText,
  genSequence: genSequence,
  getObjectFromFormGroup: getObjectFromFormGroup,
  getPatchFromFormGroup: extractPatchFromFormGroup,
  primitiveFieldsToString: primitiveFieldsToString,
  randomFloat: randomFloat,
  randomInt: randomInt,
  randomBoolean: randomBoolean,
};
