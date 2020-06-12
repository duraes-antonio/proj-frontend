import {Component} from '@angular/core';
import {Observable} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import {Sequence} from '../../../models/componentes/sequence';
import {ListSlideService} from '../../../services/lists/list-slide.service';
import {Slide} from '../../../models/componentes/slide';
import {ModalListSlideComponent} from '../../../components/dialogs/modal-list-slides/modal-list-slide.component';

@Component({
  selector: 'app-custom-list-slide',
  templateUrl: './custom-list-slide.component.html',
  styleUrls: ['./custom-list-slide.component.scss']
})
export class CustomListSlideComponent {

  lists$: Observable<Sequence<Slide>[]>;
  titlePageNoResult = 'Parece que esse será seu primeiro slider.';
  titleBtnCreate = 'Criar Slider';

  constructor(
    private readonly _listServ: ListSlideService,
    private readonly _dialog: MatDialog
  ) {
    this.lists$ = _listServ.get();
  }

  openDialogManageList(list?: Sequence<Slide>) {
    const dialogRef = this._dialog.open(
      ModalListSlideComponent,
      ModalListSlideComponent.getConfig({sequenceSlides: list})
    );
    dialogRef.componentInstance.action
      .subscribe(() => this.lists$ = this._listServ.get());
  }

  deleteSlide(id: string) {
    this._listServ.delete(id)
      .subscribe(() => this.lists$ = this._listServ.get());
  }
}
