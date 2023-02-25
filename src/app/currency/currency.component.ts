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
  data: any
  timerSubscription!: Subscription
  @Input() curName: any // refactor type

  constructor(private _apiservice: APIService) { }

  ngOnInit() {
    this.timerSubscription = timer(0, 10000).pipe(
      switchMap(() => {
        return this.data = this._apiservice.getData(this.curName);
      })
    ).subscribe(res => this.data = res);
  }

  ngOnDestroy(): void {
    this.timerSubscription.unsubscribe();
  }
}
