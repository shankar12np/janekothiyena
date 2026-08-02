import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, shareReplay } from 'rxjs/operators';
import { environment } from '../../environments/environment';

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

  private getWeather(lat: number, lon: number): Observable<WeatherData> {
    const apiKey = environment.openWeatherApiKey;
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

  getEverestBaseCampWeather(): Observable<any> {
    return this.getWeather(28.0026, 86.8520);
  }

  getAnnapurnaBaseCampWeather(): Observable<any> {
    return this.getWeather(28.5301, 83.8789);
  }

  getKathmanduWeather(): Observable<any> {
    return this.getWeather(27.7172, 85.3240);
  }
}
