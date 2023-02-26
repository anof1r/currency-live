import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable, tap } from 'rxjs';
import { APICurrencyData } from './app.component';
@Injectable({
  providedIn: 'root'
})
export class APIService {

  constructor(private _http: HttpClient) { }

  getData(currencies: string[]): Observable<APICurrencyData> {
    return this._http.get(`https://api.freecurrencyapi.com/v1/latest?apikey=pUmY7lkTS16mVDzexV4reWg4IiDiD742bqc9o9tb&currencies=${currencies.join(',')}&base_currency=RUB`) as Observable<APICurrencyData>
  }
}
