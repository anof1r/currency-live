import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable, tap } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class APIService {

  constructor(private _http: HttpClient) { }

  getData(from: string): Observable<any> {
    return this._http.get(`https://api.freecurrencyapi.com/v1/latest?apikey=v6Wv3jVhD2AAO4s7GuMMPbZocVGUPrsuKvsguas2&currencies=RUB&base_currency=${from}`).pipe(
      tap(data => JSON.stringify(data))
    )
  }
}


