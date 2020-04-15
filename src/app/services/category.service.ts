import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable, of} from 'rxjs';
import {AuthService} from './auth.service';
import {Product, ProductAdd} from '../models/product';
import {DataTests} from '../../shared/dataTests';
import {httpService} from './generic-http.service';
import {Category} from '../models/category';
import {FilterBasic} from '../models/filters/filter-base';

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
    return httpService.delete(
      this._routeApi, id, this._http, AuthService.getHeaders
    );
  }

  /*TODO: Subsituir dados mockados por consulta*/
  get(filter: FilterBasic): Observable<Category[]> {
    return httpService.get<Category>(
      this._routeApi, this._http, AuthService.getHeaders, filter
    );
  }

  /*TODO: Subsituir dados mockados por consulta*/
  getById(id: string): Observable<Category | undefined> {
    return of(DataTests.categories.find(p => p.id === id));
    return httpService.getById<Category>(
      this._routeApi, id, this._http, AuthService.getHeaders
    );
  }

  patch(obj: object, id: string): Observable<Category> {
    return httpService.patch<Category>(
      this._routeApi, id, this._http, AuthService.getHeaders, obj
    );
  }

  post(obj: ProductAdd): Observable<Product> {
    return httpService.post<ProductAdd>(
      this._routeApi, this._http, AuthService.getHeaders, obj
    );
  }
}
