import {Component} from '@angular/core';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-loading-screen',
  templateUrl: './loading-screen.component.html',
})
export class LoadingScreenComponent {

  constructor(private readonly _spinnerServ: NgxSpinnerService) {
    _spinnerServ.show();
  }
}
