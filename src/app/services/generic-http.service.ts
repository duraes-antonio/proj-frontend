import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {util} from '../../shared/util';
import {take} from 'rxjs/operators';
import {FilterBasic} from '../models/filters/filter-basic';

function _delete(
  route: string, id: string, http: HttpClient, fnGetHttpHeaders: () => HttpHeaders
): Observable<void> {
  return http.delete<void>(
    `${route.replace(/\/$/, '')}/${id}`,
    {headers: fnGetHttpHeaders()}
  ).pipe(take(1));
}

function _get<T>(
  route: string, http: HttpClient, fnGetHttpHeaders: () => HttpHeaders,
  params?: HttpParams | FilterBasic
): Observable<T | T[]> {
  let parsedParams;
  if (params) {
    parsedParams = params instanceof HttpParams
      ? params
      : new HttpParams().set('filter', JSON.stringify(util.clearEmptyFields(params)));
  }
  return http.get<T | T[]>(route, {headers: fnGetHttpHeaders(), params: parsedParams})
    .pipe(take(1));
}

function _getMultiple<T>(
  route: string, http: HttpClient, fnGetHttpHeaders: () => HttpHeaders,
  params?: HttpParams | FilterBasic
): Observable<T[]> {
  return _get<T>(route, http, fnGetHttpHeaders, params) as Observable<T[]>;
}

function _getSingle<T>(
  route: string, http: HttpClient, fnGetHttpHeaders: () => HttpHeaders,
  params?: HttpParams | FilterBasic
): Observable<T> {
  return _get<T>(route, http, fnGetHttpHeaders, params) as Observable<T>;
}

function _getById<T>(
  route: string, id: string, http: HttpClient, fnGetHttpHeaders: () => HttpHeaders,
): Observable<T> {
  return http.get<T>(
    `${route.replace(/\/$/, '')}/${id}`,
    {headers: fnGetHttpHeaders()}
  ).pipe(take(1));
}

function _patch<T>(
  route: string, id: string, http: HttpClient, fnGetHttpHeaders: () => HttpHeaders,
  objPatch: object
): Observable<T> {
  return http.patch<T>(
    `${route.replace(/\/$/, '')}/${id}`,
    objPatch,
    {headers: fnGetHttpHeaders()}
  ).pipe(take(1));
}

function _post<T>(
  route: string, http: HttpClient, fnGetHttpHeaders: () => HttpHeaders, payload: T
): Observable<any> {
  return http.post<T>(route, payload, {headers: fnGetHttpHeaders()})
    .pipe(take(1));
}

export const httpService = {
  delete: _delete,
  get: _getMultiple,
  getSingle: _getSingle,
  getById: _getById,
  patch: _patch,
  post: _post,
};
