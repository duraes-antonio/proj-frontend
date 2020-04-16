import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {OrderListComponent} from './order-list.component';
import {OrderListRoutingModule} from './order-list-routing.module';

@NgModule({
  declarations: [
    OrderListComponent
  ],
  exports: [
    OrderListComponent
  ],
  imports: [
    CommonModule,
    OrderListRoutingModule
  ]
})
export class OrderListModule {
}
