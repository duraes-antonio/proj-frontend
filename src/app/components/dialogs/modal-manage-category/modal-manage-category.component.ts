import {Component, EventEmitter, Inject, Output} from '@angular/core';
import {categorySizes} from '../../../../shared/constants/field-size';
import {getMsgFront} from '../../../../shared/validations/msgErrorFunctionsFront';
import {FormControl} from '@angular/forms';
import {validators} from '../../../../shared/validations/validatorsCustom';
import {MAT_DIALOG_DATA, MatDialogConfig} from '@angular/material/dialog';
import {Category, CategoryAdd} from '../../../models/category';
import {CategoryService} from '../../../services/category.service';

@Component({
  selector: 'app-modal-manage-category',
  templateUrl: './modal-manage-category.component.html',
  styleUrls: ['./modal-manage-category.component.scss']
})
export class ModalManageCategoryComponent {
  @Output() closed = new EventEmitter();
  @Output() action = new EventEmitter<Category>();
  readonly sizes = categorySizes;
  readonly getMsg = getMsgFront;
  readonly titleControl = new FormControl(
    this.data.category?.title ?? '',
    validators.textValidator(this.sizes.titleMax)
  );
  readonly modalTitle = `${this.data.category ? 'Edição' : 'Registro'} de categoria`;
  readonly btnCancelTitle = 'Descartar';
  readonly btnActionTitle = this.data.category ? 'Editar categoria' : 'Salvar categoria';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ModalManageCategoryData,
    private readonly _categoryServ: CategoryService
  ) {
  }

  static getConfig(data: ModalManageCategoryData): MatDialogConfig {
    return {
      data: data,
      maxHeight: '100vh',
      maxWidth: '650px',
    };
  }

  saveCategory(): void {

    if (this.titleControl.invalid) {
      return;
    }

    const newTitle = this.titleControl.value.trim();

    if (this.data.category) {
      const changed = this.data.category.title.trim() !== newTitle;

      if (changed) {
        const categoryPatch: CategoryAdd = {title: newTitle};
        this._categoryServ.patch(this.data.category.id, categoryPatch)
          .subscribe(categoryUpdated => this.action.emit(categoryUpdated));
      } else {
        this.action.emit(this.data.category);
      }
    } else {
      const categoryAdd: CategoryAdd = {title: newTitle};
      this._categoryServ.post(categoryAdd)
        .subscribe(newCategory => this.action.emit(newCategory));
    }
  }
}

export interface ModalManageCategoryData {
  category?: Category;
}
