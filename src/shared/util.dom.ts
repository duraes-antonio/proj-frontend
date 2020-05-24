import {AbstractControl} from '@angular/forms';
import {masks} from './input-masks/maskFunctions';
import * as _moment from 'moment';
import {Moment} from 'moment';

const _maskDate = (event: Event, control: AbstractControl): Date | null => {
  const target = event.target as HTMLInputElement;
  const cursorStart = target.selectionStart ?? 0;
  const cursorEnd = target.selectionEnd ?? 0;
  target.value = masks.date(target.value);

  if ((event as InputEvent).inputType.includes('delete')) {
    target.setSelectionRange(cursorStart, cursorEnd);
  } else {
    if (target.value[target.value.length - 2] === '/') {
      target.setSelectionRange(cursorStart + 1, cursorEnd + 1);
    } else {
      target.setSelectionRange(cursorStart, cursorEnd);
    }
  }

  if (target.value.length === 10) {
    control.setValue(_moment(target.value, 'DD/MM/YYYY', 'pt'));
    return (control.value as Moment).toDate();
  }
  return null;
};

export const utilDOM = {
  maskDate: _maskDate,
  setBodyBackgroundColor(colorCSS: string): void {
    const background = document.getElementById('body-content');

    if (background) {
      background.style.backgroundColor = colorCSS;
    }
  }
};
