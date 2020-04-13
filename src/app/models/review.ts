'use strict';

export interface ReviewAdd {
  readonly comment: string;
  readonly rating: number;
  readonly title: string;
  readonly productId: string;
}

/*TODO: Converter para interface após utilizar serviço*/
export class Review implements ReviewAdd {
  readonly id: number;
  readonly title: string;
  readonly comment: string;
  readonly rating: number;
  readonly productId: string;
  readonly date: Date;
  readonly userName: string;
  readonly userAvatarUrl: string;

  constructor(
    value: number, title: string, comment: string, userName: string,
    userAvatarUrl: string, productId: string, id = 0, date?: Date) {
    this.id = id;
    this.productId = productId;
    this.comment = comment;
    this.date = date ?? new Date();
    this.title = title;
    this.rating = value;

    this.userName = userName;
    this.userAvatarUrl = userAvatarUrl;
  }
}
