import {Observable} from 'rxjs';
import * as _moment from 'moment';
import {Component} from '@angular/core';
import {AbstractControl, FormControl, FormGroup} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {NgxSpinnerService} from 'ngx-spinner';
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';
import {masks} from '../../../../shared/input-masks/maskFunctions';
import {validators} from '../../../../shared/validations/validatorsCustom';
import {getMsgFront} from '../../../../shared/validations/msgErrorFunctionsFront';
import {Category, CategoryFilterFilled} from '../../../models/category';
import {CategoryService} from '../../../services/category.service';
import {ECategorySort} from '../../../enum/category-sort';
import {FilterCategory} from '../../../models/filters/filter-category';
import {categorySizes} from '../../../../shared/constants/field-size';
import {fmtTimestamp} from '../../../../shared/constants/formats';
import {ModalManageCategoryComponent} from '../../../components/dialogs/modal-manage-category/modal-manage-category.component';

@Component({
  selector: 'app-category-management',
  templateUrl: './category-management.component.html',
  styleUrls: ['./category-management.component.scss']
})
export class CategoryManagementComponent {

  readonly optsSort: { key: ECategorySort, name: string }[] = [
    {key: ECategorySort.NAME, name: 'Nome'},
    {key: ECategorySort.NEWEST, name: 'Mais recentes'},
    {key: ECategorySort.OLDEST, name: 'Mais antigas'},
    {key: ECategorySort.PRODUCT_COUNT, name: 'Número de produtos'},
  ];
  readonly filter: FilterCategory = {text: '', perPage: 10, currentPage: 1, sortBy: ECategorySort.NAME};
  readonly sizes = categorySizes;
  readonly fmtTimestamp = fmtTimestamp;
  readonly formGroup = new FormGroup({
    dateStart: new FormControl(null, validators.dateValidator(false)),
    dateEnd: new FormControl(null, validators.dateValidator(false)),
    text: new FormControl(''),
  });
  readonly _getMsgFront = getMsgFront;
  filterResult?: CategoryFilterFilled;
  sortBy = ECategorySort.NAME;
  requesting = false;

  constructor(
    private readonly _dialog: MatDialog,
    private readonly _categoryServ: CategoryService,
    private readonly _loadingServ: NgxSpinnerService,
  ) {
    _loadingServ.show();
    this._extractSearch(this._categoryServ.getForSearch(this.filter));
    const textChanges$ = this.formGroup.controls['text'].valueChanges
      .pipe(
          debounceTime(350),
          distinctUntilChanged(),
          switchMap(text => {
            return this._categoryServ.getForSearch(
                this._updateFilter(this.filter, {...this.formGroup.value, text})
            );
          })
      );
    this._extractSearch(textChanges$);
  }

  createOrEdit(category?: Category) {
    const config = ModalManageCategoryComponent.getConfig({category});
    const dialogRef = this._dialog.open(ModalManageCategoryComponent, config);
    dialogRef.componentInstance.action.subscribe(() => this.searchCategories());
  }

  searchCategories(filter?: FilterCategory) {
    if (this.formGroup.valid) {
      const filterUpdated = this._updateFilter(
        {...(filter ?? this.filter), sortBy: this.sortBy},
        this.formGroup.value
      );
      this._extractSearch(this._categoryServ.getForSearch(filterUpdated));
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

  delete(id: string) {
    this._categoryServ.delete(id).subscribe(() => this.searchCategories());
  }

  changePageSearch(pageTarget: number) {
    this.searchCategories({...this.filter, currentPage: pageTarget});
  }

  private _extractSearch(requestCategorySearch: Observable<CategoryFilterFilled>) {
    this._showLoading();
    requestCategorySearch.subscribe((filterResponse) => {
      this.filterResult = filterResponse;
      this._hideLoading();
    });
  }

  private _hideLoading() {
    this.requesting = false;
    this.formGroup.enable();
  }

  private _showLoading() {
    this.requesting = true;
    this.formGroup.disable();
  }

  private _updateFilter(filterCurr: FilterCategory, formValues: FormSearchCategory): FilterCategory {
    return {
      ...filterCurr,
      dateEnd: formValues.dateEnd?.toDate(),
      dateStart: formValues.dateStart?.toDate(),
      text: formValues.text
    };
  }
}

interface FormSearchCategory {
  categories: string[];
  dateEnd?: _moment.Moment;
  dateStart: _moment.Moment;
  text: string;
}
