import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { ExchangeRate } from '../exchange-rate';
import {environment} from "../../environments/environment";

// Define API response interfaces for type safety
interface FixerResponse {
  success: boolean;
  timestamp: number;
  base: string;
  rates: { [key: string]: number };
}

interface OpenExchangeResponse {
  timestamp: number;
  base: string;
  rates: { [key: string]: number };
}

// Configuration object for better organization
const API_CONFIG = {
  fixer: {
    url: 'http://data.fixer.io/api/latest',
    key: environment.fixerApiKey,
    defaultSymbols: 'USD,AUD,CAD,NPR'
  },
  openExchange: {
    url: 'https://openexchangerates.org/api/latest.json',
    appId: environment.openExchangeAppId,
    base: 'USD'
  },
  cacheTTL: 24 * 60 * 60 * 1000 // 24 hours in milliseconds
};

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  private cache: { [key: string]: { data: ExchangeRate[]; timestamp: number } } = {};

  constructor(private http: HttpClient) {}

  private fetchAndCache(
    cacheKey: string,
    fetchFn: () => Observable<ExchangeRate[]>
  ): Observable<ExchangeRate[]> {
    const now = Date.now();
    const cached = this.cache[cacheKey];

    if (cached && cached.timestamp && now - cached.timestamp < API_CONFIG.cacheTTL) {
      return of(cached.data);
    }

    return fetchFn().pipe(
      tap(data => {
        this.cache[cacheKey] = { data, timestamp: now };
      }),
      catchError(error => {
        console.error(`Error fetching rates for ${cacheKey}:`, error);
        return throwError(() => new Error(`Failed to fetch ${cacheKey} exchange rates`));
      })
    );
  }

  private fetchFixerRates(symbols: string = API_CONFIG.fixer.defaultSymbols): Observable<ExchangeRate[]> {
    const url = `${API_CONFIG.fixer.url}?access_key=${API_CONFIG.fixer.key}&symbols=${symbols}`;
    return this.http.get<FixerResponse>(url).pipe(
      map(response => {
        if (!response.success) {
          throw new Error('Fixer API request failed');
        }
        return Object.entries(response.rates).map(([targetCurrency, rate]) =>
          new ExchangeRate(response.base, targetCurrency, rate)
        );
      })
    );
  }

  getExchangeRates(symbols: string = API_CONFIG.fixer.defaultSymbols): Observable<ExchangeRate[]> {
    const cacheKey = `fixer-${symbols}`;
    return this.fetchAndCache(cacheKey, () => this.fetchFixerRates(symbols));
  }

  private fetchOpenExchangeRates(): Observable<ExchangeRate[]> {
    const url = `${API_CONFIG.openExchange.url}?app_id=${API_CONFIG.openExchange.appId}&base=${API_CONFIG.openExchange.base}`;
    return this.http.get<OpenExchangeResponse>(url).pipe(
      map(response => {
        return Object.entries(response.rates).map(([targetCurrency, rate]) =>
          new ExchangeRate(response.base, targetCurrency, rate)
        );
      })
    );
  }

  getUsdBasedExchangeRates(): Observable<ExchangeRate[]> {
    const cacheKey = 'openexchange-usd';
    return this.fetchAndCache(cacheKey, () => this.fetchOpenExchangeRates());
  }

  convertCurrency(
    amount: number,
    fromCurrency: string,
    toCurrency: string,
    useUsdBased: boolean = false
  ): Observable<number> {
    const fetchMethod = useUsdBased ? this.getUsdBasedExchangeRates() : this.getExchangeRates();
    return fetchMethod.pipe(
      map(rates => {
        const fromRate = rates.find(r => r.targetCurrency === fromCurrency)?.rate;
        const toRate = rates.find(r => r.targetCurrency === toCurrency)?.rate;

        if (fromRate === undefined || toRate === undefined) {
          throw new Error(`Rates not found for ${fromCurrency} or ${toCurrency}`);
        }

        // Convert via base currency (e.g., EUR for Fixer, USD for OpenExchange)
        const baseAmount = amount / fromRate;
        return baseAmount * toRate;
      }),
      catchError(error => {
        console.error('Conversion error:', error);
        return throwError(() => new Error('Currency conversion failed'));
      })
    );
  }

  clearCache(): void {
    this.cache = {};
  }
}
