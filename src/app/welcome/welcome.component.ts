import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WeatherService } from '../service/weather.service';
import { CurrencyService } from '../service/currency.service';
import { ExchangeRate } from '../exchange-rate';
import { interval, Subject, takeUntil } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FirebaseStorageService } from '../services/firebase-storage.service';
import { TmdbResponse, TmdbServiceService } from '../service/tmdb-service.service';
import { NewsService } from '../service/news.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit, OnDestroy {
  imageUrls: string[] = [];
  annapurnaImageUrls: string[] = [];
  gokyoImageUrls: string[] = [];
  thorongImageUrls: string[] = [];

  articles: any[] = [];
  newsItems: any[] = [];
  nepaliNewsItems: any[] = [];
  worldNewsItems: any[] = [];

  timeInKathmandu!: string;
  temperatureAtEverestBaseCamp!: string;
  temperatureAtAnnapurnaBaseCamp!: string;
  temperatureInKathmandu!: string;

  inputEnglishDate: string = '';
  inputNepaliDate: string = '';
  nepaliDateToday: string = '';
  englishDateToday: string = '';

  // Exchange Rates
  rates: ExchangeRate[] = [];
  usdToNprRate?: ExchangeRate;
  audToNprRate?: ExchangeRate;
  cadToNprRate?: ExchangeRate;
  eurToNprRate?: ExchangeRate;

  // AD and BS date variables (unused in this snippet, keeping for completeness)
  adYear!: number;
  adMonth!: number;
  adDay!: number;
  bsYear!: number;
  bsMonth!: number;
  bsDay!: number;
  convertedDate!: Date | string;

  utcTime?: string;

  private intervals: any[] = [];
  private unsubscribe$ = new Subject<void>();

  topMovies: any[] = [];
  topTVShows: any[] = [];
  replacementMovies: any[] = [];
  replacementTVShows: any[] = [];
  nepaliMoviesCast: any[] = [];
  topNepaliMovies: any[] = [];



  constructor(
    private firestore: AngularFirestore,
    private http: HttpClient,
    private weatherService: WeatherService,
    private currencyService: CurrencyService,
    private firebaseStorageService: FirebaseStorageService,
    private tmdbService: TmdbServiceService,
    private newsService: NewsService
  ) {}

  ngOnInit() {
    this.fetchNepaliNews();
    this.fetchWorldsTopPoliticalWarNews();

    this.updateKathmanduTime();
    this.intervals.push(setInterval(() => this.updateKathmanduTime(), 1000));

    this.updateKathmanduTemperature();
    this.intervals.push(setInterval(() => this.updateKathmanduTemperature(), 600000));

    this.updateEverestTemperature();
    this.intervals.push(setInterval(() => this.updateEverestTemperature(), 600000));

    this.updateAnnapurnaTemperature();
    this.intervals.push(setInterval(() => this.updateAnnapurnaTemperature(), 600000));

    this.updateExchangeRates();
    this.intervals.push(
      interval(86400000)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(() => this.updateExchangeRates())
    );

    const imagePaths = ['Everest Basecamp/Lukla.jpg'];
    const annapurnaImagePaths = ['Everest Basecamp/Annapurna Basecamp/jeep.jpg'];
    const gokyoImagesPaths = ['Gokyo/Congrats-Gokyo.jpg', 'Gokyo/Gokyo Ri.jpg'];
    const thorongImagesPaths = ['Thorongla/Thorong-pass.png'];

    this.loadImages(imagePaths, urls => (this.imageUrls = urls));
    this.loadImages(annapurnaImagePaths, urls => (this.annapurnaImageUrls = urls));
    this.loadImages(gokyoImagesPaths, urls => (this.gokyoImageUrls = urls));
    this.loadImages(thorongImagesPaths, urls => (this.thorongImageUrls = urls));

    this.loadTopMoviesAndCast();
    this.loadTopTVShowsAndCast();
    this.fetchTopNepaliMovies();
    this.fetchNepaliMovies();
  }

  private loadImages(paths: string[], setter: (urls: string[]) => void) {
    this.firebaseStorageService.getDownloadUrls(paths).subscribe({
      next: (urls: string[]) => setter(urls),
      error: (error) => {
        console.error(`Error fetching image URLs:`, error);
      }
    });
  }

  private loadTopMoviesAndCast() {
    this.tmdbService.getTopMovies().subscribe((data: TmdbResponse) => {
      this.topMovies = data.results;
      this.topMovies.forEach(movie => {
        this.tmdbService.getMovieCast(movie.id).subscribe(castData => {
          movie.cast = castData.cast.slice(0, 5);
        });
      });
    });
  }

  private loadTopTVShowsAndCast() {
    this.tmdbService.getTopTVShows().subscribe((data: TmdbResponse) => {
      this.topTVShows = data.results;
      this.topTVShows.forEach(show => {
        this.tmdbService.getTVShowCast(show.id).subscribe(castData => {
          show.cast = castData.cast.slice(0, 5);
        });
      });
    });
  }

  fetchNepaliNews() {
    this.newsService.getNepaliNews().subscribe({
      next: (data: any) => (this.nepaliNewsItems = data.articles.slice(0, 2)),
      error: error => console.error('Failed to fetch Nepali news', error)
    });
  }

  fetchWorldsTopPoliticalWarNews() {
    this.newsService.getWorldPoliticalWarNews().subscribe({
      next: (data: any) => (this.worldNewsItems = data.articles.slice(0, 2)),
      error: error => console.error('Failed to fetch world news', error)
    });
  }

  fetchTopNepaliMovies() {
    this.tmdbService.getTopNepaliMovies().subscribe({
      next: (response) => {
        this.topNepaliMovies = response.results;
        this.topNepaliMovies.forEach(movie => {
          this.tmdbService.getMovieCast(movie.id).subscribe(castData => {
            movie.cast = castData.cast.slice(0, 5);
          });
        });
      },
      error: error => console.error('Error fetching top Nepali movies:', error)
    });
  }

  fetchNepaliMovies() {
    this.tmdbService.getNepaliMovies().subscribe({
      next: (response) => console.log('Nepali Movies:', response.results),
      error: error => console.error('Error fetching Nepali movies:', error)
    });
  }

  getFormattedCast(cast: any[]): string {
    return cast?.map(actor => actor.name.toLowerCase()).join(', ') || '';
  }

  getMovieImageUrl(path: string): string {
    return 'https://image.tmdb.org/t/p/w500' + path;
  }

  getTVShowImageUrl(path: string): string {
    return 'https://image.tmdb.org/t/p/w500' + path;
  }

  ngOnDestroy() {
    this.intervals.forEach(clearInterval);
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  updateKathmanduTime() {
    this.http.get<any>('http://worldtimeapi.org/api/timezone/Asia/Kathmandu').subscribe(data => {
      const timeString = data.datetime.split('T')[1].split('+')[0];
      const time = new Date('1970-01-01T' + timeString + 'Z');
      const hours = time.getUTCHours() % 12 || 12;
      const minutes = time.getUTCMinutes();
      const ampm = time.getUTCHours() >= 12 ? 'PM' : 'AM';
      this.timeInKathmandu = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${ampm}`;
    });
  }

  updateKathmanduTemperature() {
    const apiKey = 'd8b4f176d89cc65db9f674b88ae1e72e';
    this.weatherService.getKathmanduWeather(apiKey).subscribe({
      next: data => (this.temperatureInKathmandu = `${data.main.temp} °C`),
      error: error => console.error('Error fetching Kathmandu weather:', error)
    });
  }

  updateEverestTemperature() {
    const apiKey = 'd8b4f176d89cc65db9f674b88ae1e72e';
    this.weatherService.getEverestBaseCampWeather(apiKey).subscribe({
      next: data => (this.temperatureAtEverestBaseCamp = `${data.main.temp} °C`),
      error: error => console.error('Error fetching Everest weather:', error)
    });
  }

  updateAnnapurnaTemperature() {
    const apiKey = 'd8b4f176d89cc65db9f674b88ae1e72e';
    this.weatherService.getAnnapurnaBaseCampWeather(apiKey).subscribe({
      next: data => (this.temperatureAtAnnapurnaBaseCamp = `${data.main.temp} °C`),
      error: error => console.error('Error fetching Annapurna weather:', error)
    });
  }

  updateExchangeRates() {
    this.currencyService.getUsdBasedExchangeRates().subscribe({
      next: (usdBasedRates) => {
        if (!usdBasedRates?.length) {
          console.warn('No USD-based rates returned');
          this.resetRates();
          return;
        }

        console.log('USD Based Rates:', usdBasedRates);
        this.rates = usdBasedRates;

        // Extract specific rates
        const usdToNpr = usdBasedRates.find(rate => rate.targetCurrency === 'NPR');
        const usdToAud = usdBasedRates.find(rate => rate.targetCurrency === 'AUD');
        const usdToCad = usdBasedRates.find(rate => rate.targetCurrency === 'CAD');
        const usdToEur = usdBasedRates.find(rate => rate.targetCurrency === 'EUR');

        // Assign direct USD to NPR rate
        this.usdToNprRate = usdToNpr;

        // Calculate cross-rates using USD as intermediary
        if (usdToAud && usdToNpr) {
          this.audToNprRate = new ExchangeRate('AUD', 'NPR', (usdToNpr.rate / usdToAud.rate));
        }
        if (usdToCad && usdToNpr) {
          this.cadToNprRate = new ExchangeRate('CAD', 'NPR', (usdToNpr.rate / usdToCad.rate));
        }
        if (usdToEur && usdToNpr) {
          this.eurToNprRate = new ExchangeRate('EUR', 'NPR', (usdToNpr.rate / usdToEur.rate));
        }
      },
      error: (error) => {
        console.error('Error fetching USD-based exchange rates:', error);
        this.resetRates();
      }
    });
  }

  resetRates() {
    this.rates = [];
    this.usdToNprRate = undefined;
    this.audToNprRate = undefined;
    this.cadToNprRate = undefined;
    this.eurToNprRate = undefined;
  }
}
