import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, merge, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  CurrencyCode,
  CURRENCY_CODES,
  TotalCartPrice,
  Price,
  PositionTotalPrice
} from './models';
import { CurrencyService } from './services';

export const initTotalCardPrice: TotalCartPrice = {
  rubles: 0,
  euros: 0,
  'US dollars': 0,
  pounds: 0,
  yens: 0
};

export const selectedCart: Price[] = [
  { price: 20 },
  { price: 45 },
  { price: 67 },
  { price: 1305 }
];

const TYPE_TO = 'RUB';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnInit, OnDestroy {
  totalCartPrice: TotalCartPrice = initTotalCardPrice;
  subscriptions: Subscription = new Subscription();

  constructor(private currencyService: CurrencyService) {}

  ngOnInit() {
    const prices$: Observable<PositionTotalPrice>[] = this.calcTotalCartPrice(
      CURRENCY_CODES
    );
    this.fillTotalCartObject(prices$);
  }

  private calcTotalCartPrice(
    currencyCodes: CurrencyCode[]
  ): Observable<PositionTotalPrice>[] {
    const sum = this.calcCartSum(selectedCart);
    const prices$: Observable<
      PositionTotalPrice
    >[] = currencyCodes.map((currency: CurrencyCode) => {
      const currency$: Observable<number> = this.currencyService.getCurrency(
        currency.code,
        TYPE_TO
      );
      const positionPrice$: Observable<PositionTotalPrice> = currency$.pipe(
        map((rate) => this.calcConvertedPrice(rate, sum)),
        map((price: number) => ({
          key: currency.key,
          amount: price
        }))
      );
      return positionPrice$;
    });

    return prices$;
  }

  private fillTotalCartObject(prices$: Observable<PositionTotalPrice>[]) {
    const mergePrice$ = merge(...prices$);
    this.subscriptions.add(
      mergePrice$.subscribe(
        (positionPrice: PositionTotalPrice) => {
          const { key, amount } = positionPrice;
          this.totalCartPrice = Object.assign(this.totalCartPrice, {
            [key]: amount
          });
        },
        (error) => console.error('Calculaion error')
      )
    );
  }

  private calcCartSum(cart: Price[]): number {
    return cart
      .map((value) => value.price)
      .reduce((prevValue, curValue) => prevValue + curValue);
  }

  private calcConvertedPrice(rate: number, sum: number): number {
    return +(rate * sum).toFixed(2);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
