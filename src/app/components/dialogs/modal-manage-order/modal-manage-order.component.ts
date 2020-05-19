import {Component, EventEmitter, Inject, Output} from '@angular/core';
import {categorySizes} from '../../../../shared/constants/field-size';
import {FormControl} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogConfig} from '@angular/material/dialog';
import {CategoryService} from '../../../services/category.service';
import {Order} from '../../../models/order';
import {orderConstants} from '../../../../shared/constants/objects/order';
import {fmtTimestamp} from '../../../../shared/constants/formats';

@Component({
  selector: 'app-modal-manage-order',
  templateUrl: './modal-manage-order.component.html',
  styleUrls: ['./modal-manage-order.component.scss']
})
export class ModalManageOrderComponent {
  @Output() closed = new EventEmitter();
  @Output() action = new EventEmitter<Order>();
  readonly sizes = categorySizes;
  readonly orderConsts = orderConstants;
  readonly dateFormat = fmtTimestamp;
  readonly modalTitle = 'Visualizar pedido';
  readonly btnCancelTitle = 'Fechar';
  readonly btnActionTitle = 'Editar pedido';
  readonly costItems = this.data.order.items
    .map(i => i.unitPrice * i.quantity)
    .reduce((prev: number, curr: number) => prev + curr);
  readonly createdAtControl = new FormControl({value: this.data.order.createdAt, disabled: true});
  readonly costDeliveryControl = new FormControl({value: this.data.order.costDelivery, disabled: true});
  readonly costItemsControl = new FormControl({value: this.data.order.costItems ?? 0, disabled: true});
  readonly orderStatusControl = new FormControl(this.data.order.state);
  readonly paymentStatusControl = new FormControl(this.data.order.paymentStatus);

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ModalManagementOrderData,
    private readonly _categoryServ: CategoryService
  ) {
  }

  static getConfig(data: ModalManagementOrderData): MatDialogConfig {
    return {
      data: data,
      maxHeight: '100vh',
      maxWidth: '650px',
    };
  }

  changeStatus() {

  }
}

export interface ModalManagementOrderData {
  order: Order;
}

