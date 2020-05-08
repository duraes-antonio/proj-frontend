import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Review, ReviewAdd} from '../models/review';
import {AuthService} from './auth.service';
import {Observable} from 'rxjs';
import {FilterReview} from '../models/filters/filter-review';
import {httpService} from './generic-http.service';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private readonly _endpoint = `${environment.apiUrl}/review`;

  constructor(
    private readonly _http: HttpClient,
    private readonly _router: Router
  ) {
  }

  delete(id: string): Observable<void> {
    return httpService.delete(this._endpoint, id, this._http, AuthService.getHeaders);
  }

  get(filter: FilterReview): Observable<Review[]> {
    return httpService.get(this._endpoint, this._http, AuthService.getHeaders, filter);
  }

  getByUserProduct(productId: string, userId: string): Observable<Review> {
    return httpService.getSingle(
      `${this._endpoint}/user/${userId}/product/${productId}`,
      this._http, AuthService.getHeaders
    );
  }

  post(review: ReviewAdd): Observable<Review> {
    return httpService.post(this._endpoint, this._http, AuthService.getHeaders, review);
  }

  patch(reviewId: string, reviewPatch: object): Observable<Review> {
    return httpService.patch(
      this._endpoint, reviewId, this._http, AuthService.getHeaders, reviewPatch
    );
  }
}

