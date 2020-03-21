import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { HttpClient, HttpParams } from "@angular/common/http";
import { map } from "rxjs/operators";

const key = "8c9901b2ec98a5aff0c9";
const url = "https://free.currconv.com/api/v7/convert";

@Injectable({
  providedIn: "root"
})
export class CurrencyService {
  constructor(private http: HttpClient) {}

  getCurrency(typeFrom: string, typeTo): Observable<number> {
    let params: HttpParams = new HttpParams();
    params = params.append("apiKey", key);
    params = params.append("compact", "y");
    const q = `${typeFrom}_${typeTo}`;
    params = params.append("q", q);

    console.log(url);
    console.log(params);

    return typeFrom === typeTo
      ? of(1)
      : this.http
          .get(url, { params: params })
          .pipe(map(response => this.mapResponseToNumber(response, q)));
    // return type ? of(100 * type.charCodeAt(0)) : of(0);
  }

  private mapResponseToNumber(response: any, key: string): number {
    if (response && response[key]) {
      return response[key]["val"] || 0;
    } else {
      return 0;
    }
  }
}
