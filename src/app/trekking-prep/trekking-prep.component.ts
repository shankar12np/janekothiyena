import { Component, ChangeDetectionStrategy } from '@angular/core';
import { TimeService } from '../service/time.service';
import { HttpClient } from "@angular/common/http";
import {WeatherService} from "../service/weather.service";

@Component({
    selector: 'app-trekking-prep',
    templateUrl: './trekking-prep.component.html',
    styleUrls: ['./trekking-prep.component.css'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class TrekkingPrepComponent {
  timeInKathmandu!: string;
  temperatureAtEverestBaseCamp!: string;
  temperatureAtAnnapurnaBaseCamp!: string;
  temperatureInKathmandu!: string;

  constructor(private timeService: TimeService,
    private http: HttpClient, private weatherService : WeatherService) {}

  ngOnInit() {
    this.updateKathmanduTime();
    setInterval(() => this.updateKathmanduTime(), 1000);

    this.updateKathmanduTemperature(); // Call the new function
    setInterval(() => this.updateKathmanduTemperature(), 600000); // Update every 10 minutes

    this.updateEverestTemperature();
    setInterval(() => this.updateEverestTemperature(), 600000); // Update every 10 minutes

    this.updateAnnapurnaTemperature(); // Update Annapurna temperature initially
    setInterval(() => this.updateAnnapurnaTemperature(), 600000); // Update Annapurna temperature every 10 minutes

  }

  updateKathmanduTime() {
    this.timeInKathmandu = this.timeService.getKathmanduTime();
  }

  updateKathmanduTemperature() {
    this.weatherService.getKathmanduWeather() // Add the new function in WeatherService
      .subscribe(data => {
        this.temperatureInKathmandu = data.main.temp + ' °C';
      }, error => {
        console.error('Error fetching Kathmandu weather data: ', error);
      });
  }

  updateEverestTemperature() {
    this.weatherService.getEverestBaseCampWeather()
      .subscribe(data => {
        this.temperatureAtEverestBaseCamp = data.main.temp + ' °C';
      }, error => {
        console.error('Error fetching the weather data: ', error);
      });
  }

  updateAnnapurnaTemperature() {
    this.weatherService.getAnnapurnaBaseCampWeather() // Call the Annapurna Base Camp weather service
      .subscribe(data => {
        this.temperatureAtAnnapurnaBaseCamp = data.main.temp + ' °C';
      }, error => {
        console.error('Error fetching the Annapurna weather data: ', error);
      });
  }

}
