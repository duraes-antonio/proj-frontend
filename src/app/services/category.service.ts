import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from './auth.service';
import {httpService} from './generic-http.service';
import {Category, CategoryAdd, CategoryFilterFilled} from '../models/category';
import {FilterBasic} from '../models/filters/filter-basic';
import {FilterCategory} from '../models/filters/filter-category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(
    private readonly _http: HttpClient,
    private readonly _router: Router
  ) {
  }

  private _routeApi = `${environment.apiUrl}/category`;

  delete(id: string): Observable<void> {
    return httpService.delete(this._routeApi, id, this._http, AuthService.getHeaders);
  }

  get(filter?: FilterBasic): Observable<Category[]> {
    return httpService.get(this._routeApi, this._http, AuthService.getHeaders, filter);
  }

  getById(id: string): Observable<Category | undefined> {
    return httpService.getById(this._routeApi, id, this._http, AuthService.getHeaders);
  }

  getForSearch(filter?: FilterCategory): Observable<CategoryFilterFilled> {
    return httpService.getSingle(`${this._routeApi}/search`, this._http, AuthService.getHeaders, filter);
  }

  patch(id: string, categoryPatch: object): Observable<Category> {
    return httpService.patch(this._routeApi, id, this._http, AuthService.getHeaders, categoryPatch);
  }

  post(category: CategoryAdd): Observable<Category> {
    return httpService.post(this._routeApi, this._http, AuthService.getHeaders, category);
  }
}
