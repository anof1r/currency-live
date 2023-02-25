import { ChangeDetectionStrategy } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Observable, timer } from 'rxjs';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})

export class HeaderComponent implements OnInit {

  title = 'Currency RUB';
  dateTime: Observable<Date>;
  basicCurrenciesArray: any =  ['USD','EUR', 'GBP'] // TODO: refactor type => basicCurrenciesArray
  additionalCurrencies: any = ['CNY', 'JPY', 'TRY'] // TODO: refactor type => additionalCurrencies
  selectedCurrency: any // TODO: refactor type => selectedCurrency

  ngOnInit() {
    this.dateTime = timer(0, 1000).pipe(
      map(() => {
        return new Date()
      })
    )
  }

  changeSelectedCurrency(value: string) {
    this.selectedCurrency = value
  }

  addCurrencies() {
    this.basicCurrenciesArray.push(this.selectedCurrency)
    const arr = this.additionalCurrencies.filter((cur: any) => cur !== this.selectedCurrency) // TODO: mb refactor it little bit smarter
    this.additionalCurrencies = arr
  }
}
