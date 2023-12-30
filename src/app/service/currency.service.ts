import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {catchError, Observable, of, tap} from 'rxjs';
import { ExchangeRate } from '../exchange-rate';
import { map } from 'rxjs/operators';
import {CacheService} from "./cache.service";

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  // private readonly apiUrl = 'http://data.fixer.io/api/latest';
  // private readonly accessKey = '<700dbb7f28859f2050e6ba84f4564d1c';
  // private readonly usdToNprApiKey = '21d3efa4a4531f54fd3f2194b380fd7b';
  // private readonly cadToNprApiKey = 'd70648d3aebc891c64a62f382c1cc608';
  // private readonly eurToNprApiKey = '700dbb7f28859f2050e6ba84f4564d1c'; // Replace with your EUR to NPR API key
  // Replace with your actual API key
  // private apiKey = '700dbb7f28859f2050e6ba84f4564d1c';
  private apiKey = 'd70648d3aebc891c64a62f382c1cc608';
  private apiUrl = `http://data.fixer.io/api/latest?access_key=${this.apiKey}&symbols=USD,AUD,CAD,NPR`;

  private cache: { [key: string]: ExchangeRate } = {};
  private cacheTime: number | null = null;

  constructor(private http: HttpClient) {}

  getExchangeRates(): Observable<ExchangeRate[]> {
    const now = new Date();
    // Check if cache exists and is not older than 24 hours
    if (Object.keys(this.cache).length > 0 && this.cacheTime && now.getTime() - this.cacheTime < 24 * 60 * 60 * 1000) {
      // Convert cached object to array of ExchangeRate
      return of(Object.values(this.cache));
    } else {
      // Fetch new data from the API
      return this.http.get<any>(this.apiUrl).pipe(
        map(response => {
          // Clear the previous cache
          this.cache = {};

          // Assume response has a 'rates' object with currency codes as keys
          for (const [currency, rate] of Object.entries(response.rates)) {
            this.cache[currency] = new ExchangeRate(response.base, currency, rate as number);
          }

          this.cacheTime = now.getTime();
          return Object.values(this.cache);
        }),
        catchError(error => {
          console.error('Error fetching data: ', error);
          return of([]);
        })
      );
    }
  }
}
