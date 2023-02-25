import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription, timer } from 'rxjs';
import { APIService } from '../api.service';
import { switchMap, map } from 'rxjs/operators'

@Component({
  selector: 'app-currency',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.scss']
})

export class CurrencyComponent implements OnInit, OnDestroy {
  data: any // TODO: pipe this stuff to angular currency
  timerSubscription!: Subscription
  @Input() curName: any // TODO: refactor type + var names

  constructor(private _apiservice: APIService) { }

  ngOnInit() {
    // TODO: dont forget to change intervalDuration to 5000
    this.timerSubscription = timer(0, 20000).pipe(
      switchMap(() => {
        return this.data = this._apiservice.getData(this.curName);
      })
    ).subscribe(res => this.data = res);
  }

  ngOnDestroy(): void {
    this.timerSubscription.unsubscribe();
  }
}
