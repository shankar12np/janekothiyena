import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient) { }

  getEverestBaseCampWeather(apiKey: string): Observable<any> {
    const lat = 28.0072; // Latitude for Everest South Base Camp (Nepal)
    const lon = 86.8520; // Longitude for Everest South Base Camp (Nepal)
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    return this.http.get(url);
  }
  // Add a method to get weather data for Annapurna Base Camp
  getAnnapurnaBaseCampWeather(apiKey: string): Observable<any> {
    const latAnnapurna = 28.5300; // Latitude for Annapurna Base Camp
    const lonAnnapurna = 83.8780; // Longitude for Annapurna Base Camp
    const urlAnnapurna = `https://api.openweathermap.org/data/2.5/weather?lat=${latAnnapurna}&lon=${lonAnnapurna}&appid=${apiKey}&units=metric`;
    return this.http.get(urlAnnapurna);
  }

  getKathmanduWeather(apiKey: string): Observable<any> {
    const lat = 27.7172; // Latitude for Kathmandu
    const lon = 85.3240; // Longitude for Kathmandu
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    return this.http.get(url);
  }
}
