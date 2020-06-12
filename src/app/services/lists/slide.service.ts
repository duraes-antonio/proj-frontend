import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {AuthService} from '../auth.service';
import {httpService} from '../generic-http.service';
import {Slide, SlideBase} from '../../models/componentes/slide';
import {take} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SlideService {

  private readonly _endpoint = `${environment.apiUrl}/slide`;

  constructor(private _http: HttpClient) {
  }

  delete(slideId: string): Observable<void> {
    return httpService.delete(this._endpoint, slideId, this._http, AuthService.getHeaders);
  }

  patch(slidePatch: object, id: string): Observable<Slide> {
    return httpService.patch(this._endpoint, id, this._http, AuthService.getHeaders, slidePatch);
  }

  patchImage(image: File, id: string): Observable<Slide> {
    const formData = new FormData();
    formData.append('image', image, image.name);
    return this._http.patch<Slide>(
      `${this._endpoint}/${id}/image`,
      formData,
      {
        headers: AuthService.getHeaders().delete('Content-Type'),
      }
    ).pipe(take(1));
  }

  post(slideAdd: SlideBase): Observable<Slide> {
    return httpService.post(this._endpoint, this._http, AuthService.getHeaders, slideAdd);
  }
}
