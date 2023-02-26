import { Component, EventEmitter, Input, Output } from '@angular/core';

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
  @Output()
  currencyToDeleteSelected = new EventEmitter<string>();
  // TODO: Add trash cans icon
  deleteCurrency(name: string) {
    this.currencyToDeleteSelected.emit(name)
  }
}
