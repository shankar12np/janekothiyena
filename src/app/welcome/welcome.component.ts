import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {WeatherService} from "../service/weather.service";
import {CurrencyService} from "../service/currency.service";
import {ExchangeRate} from "../exchange-rate";
import {interval, startWith, Subject, switchMap, takeUntil} from "rxjs";
import {NepaliDateConverter} from "../nepali-date-convertor";


@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit, OnDestroy {
  timeInKathmandu!: string;
  temperatureAtEverestBaseCamp!: string;
  temperatureAtAnnapurnaBaseCamp!: string;
  temperatureInKathmandu!: string;

  inputEnglishDate!: string;
  inputNepaliDate!: string;
  nepaliDateToday!: string;
  englishDateToday!: string;
  convertedDate!: string;


  // Exchange Rates
  usdToNprRate?: ExchangeRate;
  audToNprRate?: ExchangeRate;
  cadToNprRate?: ExchangeRate;
  eurToNprRate?: ExchangeRate;

  utcTime?: string;

  private intervals: any[] = [];
  private unsubscribe$ = new Subject<void>();

  constructor(private http: HttpClient, private weatherService: WeatherService, private currencyService: CurrencyService) {
    this.nepaliDateToday = ''; // Initialize to an empty string
    this.englishDateToday = ''; // Initialize to an empty string
  }


  ngOnInit() {
    this.updateKathmanduTime();
    setInterval(() => this.updateKathmanduTime(), 1000);

    this.updateKathmanduTemperature(); // Call the new function
    setInterval(() => this.updateKathmanduTemperature(), 600000); // Update every 10 minutes

    this.updateEverestTemperature();
    setInterval(() => this.updateEverestTemperature(), 600000); // Update every 10 minutes


    this.updateAnnapurnaTemperature(); // Update Annapurna temperature initially
    setInterval(() => this.updateAnnapurnaTemperature(), 600000); // Update Annapurna temperature every 10 minutes

    // Update exchange rates initially and then every 24 hours
    this.updateExchangeRates();
    this.intervals.push(
      interval(86400000)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(() => this.updateExchangeRates())
    );

    this.setTodayDates();
  }

  // Method to set today's dates for both English and Nepali calendars
  setTodayDates() {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1; // Note the +1 to adjust for 0-indexed months
    const day = today.getDate();

    // Convert today's date to Nepali and set it
    const nepaliDateToday = NepaliDateConverter.convertADToBS(year, month, day);
    if (nepaliDateToday) {
      this.nepaliDateToday = nepaliDateToday;
      this.inputNepaliDate = nepaliDateToday; // Set the input field's default value
    } else {
      this.nepaliDateToday = 'Invalid Date';
      this.inputNepaliDate = 'Invalid Date'; // Set the input field's default value to handle errors
    }

    this.englishDateToday = this.formatDateToYYYYMMDD(today); // Format today's date as YYYY-MM-DD
    this.inputEnglishDate = this.englishDateToday; // Set the input field's default value
  }

  // Convert AD to BS and update the convertedDate property
  convertADToBS() {
    if (this.inputEnglishDate) {
      const [year, month, day] = this.inputEnglishDate.split('-').map(Number);

      // Add a month when converting from AD to BS
      const bsMonth = month + 1;

      // Convert AD date to BS date
      const bsDate = NepaliDateConverter.convertADToBS(year, bsMonth, day);
      this.convertedDate = bsDate || 'Invalid conversion';
      console.log("English Date (Before Conversion):", this.inputEnglishDate);
      console.log("Converted Nepali Date:", this.convertedDate);
    } else {
      this.convertedDate = 'Please enter a valid date.';
    }
  }

// Convert BS to AD and update the convertedDate property
  convertBSToAD() {
    if (this.inputNepaliDate) {
      const [bsYear, bsMonth, bsDay] = this.inputNepaliDate.split('-').map(Number);

      // Subtract a month when converting from BS to AD
      const adMonth = bsMonth - 1;

      // Convert BS date to AD date
      const adDate = NepaliDateConverter.convertBSToAD(bsYear, adMonth, bsDay);
      if (adDate) {
        const formattedMonth = String(adDate.getMonth() + 1).padStart(2, '0'); // Adjust for 0-indexed month
        const formattedDay = String(adDate.getDate()).padStart(2, '0');

        // Construct the converted date string in YYYY-MM-DD format
        this.convertedDate = `${adDate.getFullYear()}-${formattedMonth}-${formattedDay}`;
        console.log("Nepali Date (Before Conversion):", this.inputNepaliDate);
        console.log("Converted English Date:", this.convertedDate);
      } else {
        this.convertedDate = 'Invalid conversion';
      }
    } else {
      this.convertedDate = 'Please enter a valid date.';
    }  }


  // Utility method to format dates as YYYY-MM-DD
  private formatDateToYYYYMMDD(date: Date): string {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  }

  ngOnDestroy() {
    // Clear intervals
    this.intervals.forEach(clearInterval);
    // Complete the subject to unsubscribe from all observables
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
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

        this.timeInKathmandu = `${strHours}:${strMinutes} ${ampm}`;
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

  // Update the component code
  updateExchangeRates() {
    this.currencyService.getExchangeRates().subscribe(rates => {
      console.log("Rates:", rates); // Debugging line to see rates

      // Fetch and store the EUR to NPR rate directly
      const eurToNprRate = rates.find(rate => rate.targetCurrency === 'NPR');
      if (eurToNprRate) {
        this.eurToNprRate = new ExchangeRate('EUR', 'NPR', eurToNprRate.rate);
      }

      // Assuming you have the EUR to foreign currency rates, calculate the other rates
      const eurToUsdRate = rates.find(rate => rate.targetCurrency === 'USD');
      if (eurToUsdRate && eurToNprRate) {
        this.usdToNprRate = new ExchangeRate('USD', 'NPR', eurToNprRate.rate / eurToUsdRate.rate);
      }

      // Repeat similar calculations for AUD and CAD
      const eurToAudRate = rates.find(rate => rate.targetCurrency === 'AUD');
      if (eurToAudRate && eurToNprRate) {
        this.audToNprRate = new ExchangeRate('AUD', 'NPR', eurToNprRate.rate / eurToAudRate.rate);
      }

      const eurToCadRate = rates.find(rate => rate.targetCurrency === 'CAD');
      if (eurToCadRate && eurToNprRate) {
        this.cadToNprRate = new ExchangeRate('CAD', 'NPR', eurToNprRate.rate / eurToCadRate.rate);
      }
    }, error => {
      console.error('Error fetching exchange rates: ', error);
    });
  }



}
