import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {WeatherService} from "../service/weather.service";

@Component({
  selector: 'app-trekking',
  templateUrl: './trekking.component.html',
  styleUrls: ['./trekking.component.css']
})
export class TrekkingComponent {
  ttimeInKathmandu!: string;
  temperatureAtEverestBaseCamp!: string;
  temperatureAtAnnapurnaBaseCamp!: string;
  temperatureInKathmandu!: string;

  constructor(private http: HttpClient, private weatherService : WeatherService) {}

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
    this.http.get<any>('http://worldtimeapi.org/api/timezone/Asia/Kathmandu')
      .subscribe(data => {
        // Extracting the time part from the datetime string
        let timeString = data.datetime.split('T')[1].split('+')[0];

        // Converting to Date object to use JavaScript's date methods
        let time = new Date('1970-01-01T' + timeString + 'Z');

        // Formatting hours and minutes with AM/PM
        let hours = time.getUTCHours();
        let minutes = time.getUTCMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // Convert hour '0' to '12'
        const strHours = hours < 10 ? `0${hours}` : hours.toString();
        const strMinutes = minutes < 10 ? `0${minutes}` : minutes.toString();

        this.ttimeInKathmandu = `${strHours}:${strMinutes} ${ampm}`;
      });
  }

  updateKathmanduTemperature() {
    const apiKey = 'd8b4f176d89cc65db9f674b88ae1e72e'; // Replace with your OpenWeatherMap API key
    this.weatherService.getKathmanduWeather(apiKey) // Add the new function in WeatherService
      .subscribe(data => {
        this.temperatureInKathmandu = data.main.temp + ' °C';
      }, error => {
        console.error('Error fetching Kathmandu weather data: ', error);
      });
  }

  updateEverestTemperature() {
    const apiKey = 'd8b4f176d89cc65db9f674b88ae1e72e'; // Your OpenWeatherMap API key
    this.weatherService.getEverestBaseCampWeather(apiKey)
      .subscribe(data => {
        this.temperatureAtEverestBaseCamp = data.main.temp + ' °C';
      }, error => {
        console.error('Error fetching the weather data: ', error);
      });
  }

  updateAnnapurnaTemperature() {
    const apiKey = 'd8b4f176d89cc65db9f674b88ae1e72e'; // Your OpenWeatherMap API key
    this.weatherService.getAnnapurnaBaseCampWeather(apiKey) // Call the Annapurna Base Camp weather service
      .subscribe(data => {
        this.temperatureAtAnnapurnaBaseCamp = data.main.temp + ' °C';
      }, error => {
        console.error('Error fetching the Annapurna weather data: ', error);
      });
  }

}
