import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";

const key = "8c9901b2ec98a5aff0c9";
const url = "https://free.currconv.com/api/v7/convert";

@Injectable({
  providedIn: "root"
})
export class CurrencyService {
  constructor() {}

  getCurrency(type: string): Observable<number> {
    return type ? of(100 * type.charCodeAt(0)) : of(0);
  }
}
