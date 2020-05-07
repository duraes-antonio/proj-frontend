import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Review, ReviewAdd} from '../models/review';
import {AuthService} from './auth.service';
import {Observable} from 'rxjs';
import {take} from 'rxjs/operators';
import {FilterReview} from '../models/filters/filter-review';
import {util} from '../../shared/util';
import {httpService} from './generic-http.service';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private readonly _routeApi = `${environment.apiUrl}/review`;

  constructor(
    private readonly _http: HttpClient,
    private readonly _router: Router
  ) {
  }

  delete(id: string): Observable<Review> {
    return this._http.delete<Review>(
      `${this._routeApi}/${id}`,
      {headers: AuthService.getHeaders()}
    ).pipe(take(1));
  }

  /*TODO: Adicionar filtro*/
  get(filter: FilterReview): Observable<Review[]> {
    const clearFilter = util.primitiveFieldsToString(util.clearEmptyFields(filter));
    return this._http.get<Review[]>(
      this._routeApi,
      {headers: AuthService.getHeaders(), params: clearFilter}
    ).pipe(take(1));
  }

  getByUserProduct(productId: string, userId: string): Observable<Review> {
    return httpService.getSingle(
      `${this._routeApi}/user/${userId}/product/${productId}`,
      this._http, AuthService.getHeaders
    );
  }

  post(obj: ReviewAdd): Observable<Review> {
    return this._http.post<Review>(
      this._routeApi,
      obj,
      {headers: AuthService.getHeaders()}
    ).pipe(take(1));
  }

  patch(obj: object): Observable<Review> {
    return this._http.patch<Review>(
      this._routeApi,
      obj,
      {headers: AuthService.getHeaders()}
    ).pipe(take(1));
  }
}

