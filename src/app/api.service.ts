import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { APICurrencyData } from './app.component';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class APIService {

  constructor(private _http: HttpClient) { }

  getData(currencies: string[]): Observable<APICurrencyData> {
    return this._http.get(`https://api.freecurrencyapi.com/v1/latest?apikey=${environment.api_key}&currencies=${currencies.join(',')}&base_currency=RUB`) as Observable<APICurrencyData>;
  }
}
