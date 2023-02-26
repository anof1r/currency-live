import { Component, OnInit } from '@angular/core';
import { Subscription, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { APIService } from './api.service';
// TODO: move to type directory and import here

interface CurrencyChanges {
  USD: number,
  EUR: number,
  GBP: number,
  CNY: number,
  JPY: number,
  TRY: number,
}

export interface APICurrencyData {
  data: {
    USD?: number,
    EUR?: number,
    GBP?: number,
    CNY?: number,
    JPY?: number,
    TRY?: number,
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'Currency RUB';
  dateTime: Date = new Date();
  basicCurrenciesArray: Array<keyof CurrencyChanges> = ['USD','EUR', 'GBP']
  additionalCurrencies: Array<keyof CurrencyChanges> = ['CNY', 'JPY', 'TRY']
  selectedCurrency: keyof CurrencyChanges
  data: APICurrencyData = {data: {}}
  timerSubscription!: Subscription
  currencyChanges: CurrencyChanges = { USD: 0, EUR: 0, GBP: 0, CNY: 0, JPY: 0, TRY: 0};

  constructor(private _apiservice: APIService) { }

  ngOnInit() {
    this.timerSubscription = timer(0, 5000).pipe(
      switchMap(() => {
        const data = this._apiservice.getData(this.basicCurrenciesArray);
        return data
      })
    ).subscribe(newData => {
      Object.keys(newData.data).forEach((key: string) => {
        const currencyKey = key as typeof this.basicCurrenciesArray[number] // ts cannot provide valid type for 'key'
        newData.data[currencyKey] = +(1 / (newData.data[currencyKey] || 1)).toFixed(2);
        this.currencyChanges[currencyKey] = newData.data[currencyKey] as number - (this.data.data[currencyKey] || newData.data[currencyKey] as number)
      });
      this.data = newData
      this.dateTime = new Date()
    });
  }

  changeSelectedCurrency(value: string) {
    this.selectedCurrency = value as keyof CurrencyChanges // ts cannot provide valid type for 'value' from onChange
  }

  addCurrencies() {
    this._apiservice.getData([this.selectedCurrency]).subscribe(newCurrencyData => {
      this.data.data[this.selectedCurrency] = +(1 / (newCurrencyData.data[this.selectedCurrency] || 1)).toFixed(2);
      this.basicCurrenciesArray.push(this.selectedCurrency)
      this.additionalCurrencies = this.additionalCurrencies.filter(cur => cur !== this.selectedCurrency)
    });
  }

  ngOnDestroy(): void {
    this.timerSubscription.unsubscribe();
  }

}
