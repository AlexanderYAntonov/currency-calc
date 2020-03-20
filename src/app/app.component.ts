import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { CurrencyCode, CURRENCY_CODES } from "./models";
import { CurrencyService } from "./services";

interface Price {
  price: number;
}

interface TotalPrice {
  key: string;
  amount$: Observable<number>;
}

interface TotalCartPrice {
  rubles: number;
  euros: number;
  "US dollars": number;
  pounds: number;
  yens: number;
}

const selectedCart: Price[] = [
  { price: 20 },
  { price: 45 },
  { price: 67 },
  { price: 1305 }
];
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  readonly cart: Price[] = selectedCart;
  result: TotalPrice[];

  constructor(private currencyService: CurrencyService) {}

  ngOnInit() {
    const sum = selectedCart
      .map(value => value.price)
      .reduce((prevValue, curValue) => prevValue + curValue);
    this.result = CURRENCY_CODES.map((currency: CurrencyCode) => ({
      key: currency.key,
      amount$: this.currencyService
        .getCurrency(currency.code)
        .pipe(map(rate => this.calcAmount(rate, sum)))
    }));
    this.result.forEach(res => res.amount$.subscribe(val => console.log(val)));
  }

  private calcAmount(rate: number, sum: number): number {
    return rate * sum;
  }
}
