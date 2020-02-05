import {Component, Input, OnInit} from '@angular/core';
import {masks} from '../../../../shared/input-masks/maskFunctions';

@Component({
  selector: 'app-input-number',
  templateUrl: './input-number.component.html',
  styleUrls: ['./input-number.component.scss']
})
export class InputNumberComponent implements OnInit {
  @Input() maxValue = 99999;
  @Input() minValue = 1;
  @Input() valueInit = 1;

  constructor() {
  }

  ngOnInit() {
  }

  increment(value: number, min: number, max: number): number {
    return masks.valueOrMax(masks.valueOrMin(value + 1, min), max);
  }

  decrement(value: number, min: number, max: number): number {
    return masks.valueOrMax(masks.valueOrMin(value - 1, min), max);
  }

  formatInput(keyPress: Event, num: number, min: number, max: number) {
    const targetValue = (keyPress.target as HTMLInputElement).valueAsNumber;
    const data = (keyPress as any).key;

    /*Se for numérico*/
    if (targetValue) {
      this.valueInit = masks.valueOrMax(masks.valueOrMin(targetValue, min), max);
    } else {
      /*Se for algum operador matemático*/
      this.valueInit = data ? this.valueInit : min;
    }

    (keyPress.target as HTMLInputElement).valueAsNumber = this.valueInit;
  }
}
