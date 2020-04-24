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
  filter?: FilterBasic
): Observable<T[]> {
  const params = filter
    ? new HttpParams({
      fromObject: util.primitiveFieldsToString(util.clearEmptyFields(filter))
    })
    : {};
  return http.get<T[]>(route, {headers: fnGetHttpHeaders(), params})
    .pipe(take(1));
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
  get: _get,
  getById: _getById,
  patch: _patch,
  post: _post,
};
