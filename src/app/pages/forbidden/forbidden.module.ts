import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ForbiddenComponent} from './forbidden.component';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [ForbiddenComponent],
  imports: [
    CommonModule,
    RouterModule,
  ]
})
export class ForbiddenModule {
}
