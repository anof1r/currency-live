import { Component, OnInit } from '@angular/core';
import { Observable, timer } from 'rxjs';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {

  title = 'Currency RUB';
  dateTime: Observable<Date>;
  currencyNameArr: any =  ['USD','EUR', 'GBP'] // refactor type

  ngOnInit() {
    this.dateTime = timer(0, 1000).pipe(
      map(() => {
        return new Date()
      })
    )
  }

  addCurrencies() {
    this.currencyNameArr.push('CNY')
  }
}
