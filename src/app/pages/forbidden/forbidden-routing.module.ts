import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ForbiddenComponent} from './forbidden.component';
import {routesFrontend} from '../../../shared/constants/routes-frontend';

const routes: Routes = [
  {
    path: routesFrontend.forbidden,
    component: ForbiddenComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ForbiddenRoutingModule {
}
