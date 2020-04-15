'use strict';
export interface ReviewAdd {
  readonly comment: string;
  readonly rating: number;
  readonly title: string;
  readonly productId: string;
}

export interface Review extends ReviewAdd {
  readonly id: string;
  readonly date: Date;
  readonly userId: string;
  readonly userName: string;
  readonly userAvatarUrl: string;
}
