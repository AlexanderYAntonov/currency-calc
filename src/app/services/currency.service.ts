import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';

const apiKey = '8c9901b2ec98a5aff0c9';
const url = 'https://free.currconv.com/api/v7/convert';
const responseVal = 'val';
@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  constructor(private http: HttpClient) {}

  getCurrency(typeFrom: string, typeTo: string): Observable<number> {
    const q = `${typeFrom}_${typeTo}`;
    const params: HttpParams = this.buildParams(q);

    return typeFrom === typeTo
      ? of(1)
      : this.http.get(url, { params }).pipe(
          map((response) => this.mapResponseToNumber(response, q)),
          catchError((error) => {
            console.error(error);
            return of(0);
          })
        );
  }

  private buildParams(q: string): HttpParams {
    let params: HttpParams = new HttpParams();
    params = params.append('apiKey', apiKey);
    params = params.append('compact', 'y');
    params = params.append('q', q);
    return params;
  }

  private mapResponseToNumber(response: any, key: string): number {
    if (response && response[key]) {
      return response[key][responseVal] || 0;
    } else {
      return 0;
    }
  }
}
