import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Review, ReviewAdd} from '../models/review';
import {AuthService} from './auth.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private _routeApi = `${environment.apiUrl}/address`;

  constructor(
    private _http: HttpClient,
    private _router: Router
  ) {
  }

  delete(id: string): Observable<Review> {
    return this._http.delete<Review>(
      `${this._routeApi}/${id}`,
      {headers: AuthService.getHeaders()}
    );
  }

  get(): Observable<Review[]> {
    return this._http.get<Review[]>(
      this._routeApi,
      {headers: AuthService.getHeaders()}
    );
  }

  post(obj: ReviewAdd): Observable<Review> {
    return this._http.post<Review>(
      this._routeApi,
      obj,
      {headers: AuthService.getHeaders()}
    );
  }

  patch(obj: object): Observable<void> {
    return this._http.patch<void>(
      this._routeApi,
      obj,
      {headers: AuthService.getHeaders()}
    );
  }
}

