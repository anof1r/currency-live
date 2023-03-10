import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription, timer } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { APIService } from './api.service';
import { APICurrencyData, CurrencyChanges, CurrencyName } from './types';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  title = 'Currency RUB';
  dateTime: Date = new Date();
  currentCurrencies: Array<CurrencyName> = ['USD', 'EUR', 'GBP'];
  additionalCurrencies: Array<CurrencyName> = ['CNY', 'JPY', 'TRY'];
  data: APICurrencyData = { data: {} };
  timerSubscription!: Subscription;
  currencyChanges: CurrencyChanges = { USD: 0, EUR: 0, GBP: 0, CNY: 0, JPY: 0, TRY: 0 };
  destroy: Subject<boolean> = new Subject<boolean>();

  constructor(private _apiservice: APIService) { }

  ngOnInit() {
    this.timerSubscription = timer(0, 5000).pipe(
      switchMap(() => {
        const data = this._apiservice.getData(this.currentCurrencies);
        return data;
      }),
      takeUntil(this.destroy)
    ).subscribe(newData => {
      Object.keys(newData.data).forEach((key: string) => {
        const currencyKey = key as typeof this.currentCurrencies[number]; // ts cannot provide valid type for 'key'
        newData.data[currencyKey] = +(1 / (newData.data[currencyKey] || 1)).toFixed(2);
        this.currencyChanges[currencyKey] = newData.data[currencyKey] as number - (this.data.data[currencyKey] || newData.data[currencyKey] as number);
      });
      this.data = newData;
      this.dateTime = new Date();
    });
  }

  addCurrencies(addCurrencie: string) {
    const currency = addCurrencie as CurrencyName;
    this._apiservice.getData([currency]).subscribe(newCurrencyData => {
      this.data.data[currency] = +(1 / (newCurrencyData.data[currency] || 1)).toFixed(2);
      this.currentCurrencies.push(currency as keyof CurrencyChanges);
      this.additionalCurrencies = this.additionalCurrencies.filter(cur => cur !== currency);
    });
  }

  deleteCurrency(currencyToDelete: string) {
    this.currentCurrencies = this.currentCurrencies.filter(el => el !== currencyToDelete);
    this.additionalCurrencies.push(currencyToDelete as CurrencyName);
  }

  ngOnDestroy(): void {
    this.destroy.next(true);
    this.destroy.complete();
    // this.timerSubscription.unsubscribe();
  }

}
export { APICurrencyData };

