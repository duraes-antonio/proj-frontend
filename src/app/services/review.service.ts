import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Review, ReviewAdd} from '../models/review';
import {AuthService} from './auth.service';
import {Observable, of} from 'rxjs';
import {take} from 'rxjs/operators';
import {FilterReview} from '../models/filters/filter-review';
import {DataTests} from '../../shared/dataTests';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private readonly _routeApi = `${environment.apiUrl}/address`;

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
    return of(DataTests.reviews);
    return this._http.get<Review[]>(
      this._routeApi,
      {headers: AuthService.getHeaders()}
    ).pipe(take(1));
  }

  getByUserProduct(productId: string, userId: string): Observable<Review> {
    return this._http.get<Review>(
      this._routeApi,
      {headers: AuthService.getHeaders()}
    ).pipe(take(1));
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

