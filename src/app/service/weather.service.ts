import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, shareReplay } from 'rxjs/operators';

export interface WeatherData {
  main: { temp: number; pressure: number; humidity: number };
  weather: { description: string }[];
  wind: { speed: number; deg: number };
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private baseUrl = 'https://api.openweathermap.org/data/2.5/weather';
  private weatherCache = new Map<string, Observable<WeatherData>>();

  constructor(private http: HttpClient) {}

  private getWeather(lat: number, lon: number, apiKey: string): Observable<WeatherData> {
    if (!apiKey || apiKey.trim() === '') {
      return throwError(() => new Error('API key is required'));
    }
    const cacheKey = `${lat}-${lon}`;
    if (!this.weatherCache.has(cacheKey)) {
      const url = `${this.baseUrl}?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
      this.weatherCache.set(
        cacheKey,
        this.http.get<WeatherData>(url).pipe(
          catchError((error) => {
            console.error(`Weather API error for lat: ${lat}, lon: ${lon}`, error);
            return throwError(() => new Error('Unable to fetch weather data'));
          }),
          shareReplay(1)
        )
      );
    }
    return this.weatherCache.get(cacheKey)!;
  }

  getEverestBaseCampWeather(apiKey: string): Observable<any> {
    return this.getWeather(28.0026, 86.8520, apiKey);
  }

  getAnnapurnaBaseCampWeather(apiKey: string): Observable<any> {
    return this.getWeather(28.5301, 83.8789, apiKey);
  }

  getKathmanduWeather(apiKey: string): Observable<any> {
    return this.getWeather(27.7172, 85.3240, apiKey);
  }
}
