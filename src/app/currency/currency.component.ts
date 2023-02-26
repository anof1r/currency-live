import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-currency',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.scss']
})

export class CurrencyComponent {

  @Input()
  currencyName: string
  @Input()
  currencyValue: number
  @Input()
  currencyChange: number

}
