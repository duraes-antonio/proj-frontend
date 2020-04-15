import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private readonly _endpointUrl = `${environment.apiUrl}/client`;

  constructor(
    private _http: HttpClient,
  ) {
  }
}
