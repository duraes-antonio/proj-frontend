import {Component} from '@angular/core';
import {categorySizes} from '../../../../shared/constants/field-size';
import {AbstractControl, FormControl, FormGroup} from '@angular/forms';
import {validators} from '../../../../shared/validations/validatorsCustom';
import {getMsgFront} from '../../../../shared/validations/msgErrorFunctionsFront';
import {MatDialog} from '@angular/material/dialog';
import {NgxSpinnerService} from 'ngx-spinner';
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';
import {masks} from '../../../../shared/input-masks/maskFunctions';
import * as _moment from 'moment';
import {Observable} from 'rxjs';
import {fmtTimestamp} from '../../../../shared/constants/formats';
import {OrderOptionsSort} from '../../../enum/order';
import {FilterOrder} from '../../../models/filters/filter-order';
import {OrderFilterFilled} from '../../../models/order';
import {OrderService} from '../../../services/order.service';
import {orderConstants} from '../../../../shared/constants/objects/order';
import {ModalManageOrderComponent} from '../../../components/dialogs/modal-manage-order/modal-manage-order.component';

@Component({
  selector: 'app-order-management',
  templateUrl: './order-management.component.html',
  styleUrls: ['./order-management.component.scss']
})
export class OrderManagementComponent {
  readonly orderConsts = orderConstants;
  readonly filter: FilterOrder = {perPage: 10, currentPage: 1, sortBy: OrderOptionsSort.NEWEST};
  readonly sizes = categorySizes;
  readonly fmtTimestamp = fmtTimestamp;
  readonly formGroup = new FormGroup({
    dateStart: new FormControl(null, validators.dateValidator(false)),
    dateEnd: new FormControl(null, validators.dateValidator(false)),
    text: new FormControl(''),
  });
  readonly _getMsgFront = getMsgFront;
  filterResult?: OrderFilterFilled;
  sortBy = OrderOptionsSort.NEWEST;
  orderStatusSelected = null;
  paymentStatusSelected = null;
  requesting = false;

  constructor(
    private readonly _dialog: MatDialog,
    private readonly _orderServ: OrderService,
    private readonly _loadingServ: NgxSpinnerService,
  ) {
    _loadingServ.show();
    this._extractSearch(this._orderServ.search(this.filter));
    const textChanges$ = this.formGroup.controls['text'].valueChanges
      .pipe(
        debounceTime(250),
        distinctUntilChanged(),
        switchMap(text => {
          return this._orderServ.search(
            this._updateFilter(this.filter, {...this.formGroup.value, text})
          );
        })
      );
    this._extractSearch(textChanges$);
  }

  createOrEdit(orderId: string) {
    this._orderServ.getById(orderId).subscribe(order => {
      const config = ModalManageOrderComponent.getConfig({order});
      const dialogRef = this._dialog.open(ModalManageOrderComponent, config);
      dialogRef.componentInstance.action.subscribe(() => this.search());
    });
  }

  search(filter?: FilterOrder) {
    if (this.formGroup.valid) {
      const filterUpdated = this._updateFilter(
        {
          ...(filter ?? this.filter),
          orderStatus: this.orderStatusSelected ?? undefined,
          paymentStatus: this.paymentStatusSelected ?? undefined,
          sortBy: this.sortBy
        },
        this.formGroup.value
      );
      this._extractSearch(this._orderServ.search(filterUpdated));
    }
  }

  maskDate(event: Event, control: AbstractControl) {
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
    }
  }

  changePageSearch(pageTarget: number) {
    this.search({...this.filter, currentPage: pageTarget});
  }

  private _extractSearch(requestCategorySearch: Observable<OrderFilterFilled>) {
    this.requesting = false;
    requestCategorySearch.subscribe((filterResponse) => {
      this.filterResult = filterResponse;
      this.requesting = false;
    });
  }

  private _updateFilter(filterCurr: FilterOrder, formValues: FormSearchCategory): FilterOrder {
    return {
      ...filterCurr,
      dateEnd: formValues.dateEnd?.toDate(),
      dateStart: formValues.dateStart?.toDate(),
      clientName: formValues.text
    };
  }
}

interface FormSearchCategory {
  categories: string[];
  dateEnd?: _moment.Moment;
  dateStart: _moment.Moment;
  text: string;
}
