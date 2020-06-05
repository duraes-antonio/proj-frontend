import {Component} from '@angular/core';
import {Observable} from 'rxjs';
import {ListProduct} from '../../../models/componentes/list-product';
import {ListProductService} from '../../../services/lists/list-product.service';
import {Product} from '../../../models/product';
import {MatDialog} from '@angular/material/dialog';
import {ModalListProductComponent} from '../../../components/dialogs/modal-list-product/modal-list-product.component';
import {Sequence} from '../../../models/componentes/sequence';

@Component({
  selector: 'app-custom-list-product',
  templateUrl: './custom-list-product.component.html',
  styleUrls: ['./custom-list-product.component.scss']
})
export class CustomListProductComponent {

  lists$: Observable<ListProduct[]>;

  constructor(
    private readonly _listServ: ListProductService,
    private readonly _dialog: MatDialog
  ) {
    this.lists$ = _listServ.get();
  }

  openDialogManageList(list?: Sequence<Product>) {
    const dialogRef = this._dialog.open(
      ModalListProductComponent,
      ModalListProductComponent.getConfig({listProduct: list})
    );
  }
}
