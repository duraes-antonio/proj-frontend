import {Component, EventEmitter, Inject, Output} from '@angular/core';
import {Sequence} from '../../../models/componentes/sequence';
import {getMsgFront} from '../../../../shared/validations/msgErrorFunctionsFront';
import {ERole} from '../../../enum/roles';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {validators} from '../../../../shared/validations/validatorsCustom';
import {MAT_DIALOG_DATA, MatDialogConfig} from '@angular/material/dialog';
import {Slide} from '../../../models/componentes/slide';
import {listSizes, slideSizes} from '../../../../shared/constants/field-size';
import {ListSlideService} from '../../../services/lists/list-slide.service';
import {SlideService} from '../../../services/lists/slide.service';
import * as _ from 'lodash';
import {debounceTime, distinctUntilChanged, filter, switchMap} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-modal-list-slides',
  templateUrl: './modal-list-slide.component.html',
  styleUrls: ['./modal-list-slide.component.scss']
})
export class ModalListSlideComponent {
  @Output() closed = new EventEmitter();
  @Output() action = new EventEmitter<Sequence<Slide>>();
  readonly getMsg = getMsgFront;
  readonly listSizes = listSizes;
  readonly slideSizes = slideSizes;
  readonly formatsImageAccept = 'image/gif, image/png, image/jpeg, image/webp';

  readonly btnAcceptTitle = this.data.sequence ? undefined : 'Criar slider';
  readonly btnCancelTitle = this.data.sequence ? 'OK' : 'Descartar alterações';
  readonly modalTitle = `${this.data.sequence ? 'Edição' : 'Registro'} de lista de slides`;

  readonly dataClone?: Sequence<Slide> = this.data.sequence
    ? _.cloneDeep(this.data.sequence) : undefined;
  readonly slideIdFormGroup = new Map<string, FormGroup>();
  readonly listFormGroup = new FormGroup({
    title: new FormControl(
      this.data.sequence?.title,
      validators.textValidator(listSizes.titleMax, listSizes.titleMin)
    ),
    slides: new FormControl(
      this.dataClone?.itemsId ?? [], Validators.minLength(1)
    )
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ModalListSlideData,
    private readonly _listSlideServ: ListSlideService,
    private readonly _slideServ: SlideService
  ) {
    const cloneList: Sequence<Slide> | undefined = this.dataClone;
    if (cloneList) {
      this._watchFormControlText(
        this.listFormGroup.controls['title'],
        (title: string) => this._listSlideServ.patch({title}, cloneList.id)
      ).subscribe();
      cloneList.items.forEach(s => {
        const formGroup = this._formFromSlide(s);
        this.slideIdFormGroup.set(s.id, formGroup);
        this._watchFormGroupSlide(s.id, formGroup);
      });
    }
  }

  static getConfig(data: ModalListSlideData): MatDialogConfig {
    return {
      data: data,
      maxHeight: '100vh',
      maxWidth: '650px',
    };
  }

  save() {
    if (this.dataClone) {
      this._listSlideServ.patch(
        {
          title: this.listFormGroup.controls['title'].value,
          itemsId: this.dataClone.items.map(p => p.id),
        },
        this.dataClone.id
      ).subscribe(sequence => this.action.emit(sequence));
    } else {
      this._listSlideServ.post({
        title: this.listFormGroup.controls['title'].value,
        itemsId: [],
        readRole: ERole.UNKNOWN
      }).subscribe(sequence => this.action.emit(sequence));
    }
  }

  createSlide(listSlide?: Sequence<Slide>) {
    if (listSlide) {
      this._slideServ.post({
        url: 'https://www.google.com',
        title: `${(listSlide.items.length ?? 0) + 1}º Slide`,
        index: listSlide.items.length ?? 0,
      }).subscribe((s: Slide) => {
        listSlide.items.push(s);
        listSlide.itemsId.push(s.id);
        const formGroup = this._formFromSlide(s);
        this.slideIdFormGroup.set(s.id, formGroup);
        this._watchFormGroupSlide(s.id, formGroup);
        this._listSlideServ
          .patch({itemsId: listSlide.itemsId}, listSlide.id)
          .subscribe();
      });
    }
  }

  deleteSlide(slideId: string, listSlides: Sequence<Slide>) {
    this._slideServ.delete(slideId)
      .subscribe(() => {
        const indexSlide = listSlides.items.findIndex(s => s.id === slideId);
        if (indexSlide > -1) {
          this.slideIdFormGroup.delete(slideId);
          listSlides.itemsId.splice(indexSlide, 1);
          listSlides.items.splice(indexSlide, 1);
        }
      });
  }

  previewImage(event: Event, slideId: string, listSlide?: Sequence<Slide>) {
    const files = (event.target as HTMLInputElement).files;

    if (files?.length && listSlide) {
      const fileReader = new FileReader();
      fileReader.onloadend = () => {
        const indexSlide = listSlide.items.findIndex(s => s.id === slideId);
        listSlide.items[indexSlide] = {
          ...listSlide.items[indexSlide],
          imageUrl: fileReader.result as string
        };
      };
      fileReader.readAsDataURL(files[0]);
      this._slideServ.patchImage(files[0], slideId).subscribe();
    }
  }

  private _formFromSlide(slide: Slide): FormGroup {
    return new FormGroup({
      title: new FormControl(
        slide.title,
        validators.textValidator(slideSizes.titleMax, slideSizes.titleMin)
      ),
      url: new FormControl(
        slide.url,
        validators.textValidator(slideSizes.urlMax, slideSizes.urlMin)
      )
    });
  }

  private _watchFormGroupSlide(slideId: string, form: FormGroup) {
    this._watchFormControlText(form.controls['title'], (title: string) =>
      this._slideServ.patch({title}, slideId)
    ).subscribe();
    this._watchFormControlText(form.controls['url'], (url: string) =>
      this._slideServ.patch({url}, slideId)
    ).subscribe();
  }

  private _watchFormControlText<T>(
    formCtrl: AbstractControl, cb: (text: string) => Observable<T>
  ): Observable<T> {
    return formCtrl.valueChanges
      .pipe(
        filter(value => !!value && value.trim().length),
        debounceTime(250),
        distinctUntilChanged(),
        switchMap(text => cb(text))
      );
  }
}

export interface ModalListSlideData {
  sequence?: Sequence<Slide>;
}
