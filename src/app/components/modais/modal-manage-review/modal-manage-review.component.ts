import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {Review} from '../../../models/review';
import {MAT_DIALOG_DATA, MatDialogConfig} from '@angular/material/dialog';
import {reviewSizes} from '../../../../shared/constants/fieldSize';
import {getMsgFront} from '../../../../shared/validations/msgErrorFunctionsFront';
import {FormControl, FormGroup} from '@angular/forms';
import {ReviewService} from '../../../services/review.service';
import {validators} from '../../../../shared/validations/validatorsCustom';
import {util} from '../../../../shared/utilFunctions';

@Component({
  selector: 'app-modal-manage-review',
  templateUrl: './modal-manage-review.component.html',
  styleUrls: ['./modal-manage-review.component.scss']
})
export class ModalManageReviewComponent implements OnInit {
  @Output() closed = new EventEmitter();
  @Output() action = new EventEmitter<Review>();
  readonly sizes = reviewSizes;
  readonly getMsg = getMsgFront;
  readonly reviewFormGroup = new FormGroup({
    title: new FormControl(
      this.data.review?.title,
      [validators.textValidator(this.sizes.titleMax, this.sizes.titleMin)]
    ),
    comment: new FormControl(
      this.data.review?.comment,
      [validators.textValidator(this.sizes.commentMax, this.sizes.commentMin)]
    ),
    rating: new FormControl(
      this.data.review?.rating,
      [validators.numberValidator(this.sizes.ratingMin, this.sizes.ratingMax, true)]
    )
  });
  readonly modalTitle = `${this.data.review ? 'Edição' : 'Registro'} de avaliação`;
  // tslint:disable-next-line:max-line-length
  readonly modalDesc = 'Confira so dados abaixo, mas não se preocupe, a avaliação é opcional e ' +
    'poderá ser editada futuramente nesta mesma página. :)';
  readonly btnCancelTitle = 'Descartar';
  readonly btnActionTitle = this.data.review ? 'Editar avaliação' : 'Avaliar produto';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ModalManageReviewData,
    private readonly _reviewServ: ReviewService
  ) {
  }

  static getConfig(data: ModalManageReviewData): MatDialogConfig {
    return {
      data: data,
      maxHeight: '100vh',
      maxWidth: '650px',
    };
  }

  ngOnInit(): void {
  }

  saveReview(): void {

    if (this.reviewFormGroup.invalid) {
      return;
    }

    // Se o endereço já existir, save-o; senão, crie-o
    if (this.data.review) {
      this._reviewServ.patch(util.getPatchFromFormGroup(this.data.review, this.reviewFormGroup))
        .subscribe((reviewUpdated) => this.action.emit(reviewUpdated));
    } else {
      this._reviewServ.post(util.getObjectFromFormGroup(this.reviewFormGroup))
        .subscribe((newReview) => this.action.emit(newReview));
    }
  }
}

export interface ModalManageReviewData {
  review?: Review;
}
