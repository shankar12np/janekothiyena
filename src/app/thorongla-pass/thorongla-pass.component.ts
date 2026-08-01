import { Component } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {WeatherService} from "../service/weather.service";
import {PixabayService} from "../service/pixabay.service";
import {FirebaseStorageService} from "../services/firebase-storage.service";
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";

@Component({
    selector: 'app-thorongla-pass',
    templateUrl: './thorongla-pass.component.html',
    styleUrls: ['./thorongla-pass.component.css'],
    standalone: false
})
export class ThoronglaPassComponent {

  ttimeInKathmandu!: string;
  temperatureAtEverestBaseCamp!: string;
  temperatureAtAnnapurnaBaseCamp!: string;
  temperatureInKathmandu!: string;
  images: any[] = [];
  searchTerm: string = '';

  imageUrls: { url: string; alt: string; caption: string }[] = [];

  constructor(private http: HttpClient, private weatherService : WeatherService, private sanitizer: DomSanitizer,
              private pixabayService: PixabayService, private firebaseStorageService: FirebaseStorageService) {}

  ngOnInit() {
    this.updateKathmanduTime();
    setInterval(() => this.updateKathmanduTime(), 1000);

    this.updateKathmanduTemperature(); // Call the new function
    setInterval(() => this.updateKathmanduTemperature(), 600000); // Update every 10 minutes

    this.updateEverestTemperature();
    setInterval(() => this.updateEverestTemperature(), 600000); // Update every 10 minutes

    this.updateAnnapurnaTemperature(); // Update Annapurna temperature initially
    setInterval(() => this.updateAnnapurnaTemperature(), 600000); // Update Annapurna temperature every 10 minutes

    this.search('Thorong La Pass trek, mountain scenery, Himalayan landscape, trekking in Nepal');
    // this.searchImages('Annapurna-basecamp');  // Default search or based on user input

    // Step 1: Define your static image metadata
    const imageGalleryData = [
      {
        src: 'Thorongla/Chame.png',
        alt: 'Chame Village',
        caption: '**<strong>Day 1</strong>**: 🚙 Chame: Gateway to the Annapurna region. Distance: 16 KM from Pokhara. Travel by jeep from Pokhara to Manang.'
      },
      {
        src: 'Thorongla/Manang.png',
        alt: 'Manang Valley',
        caption: '**<strong>Day 1 & 2</strong>**: 🚙 Manang: Perfect for acclimatization. Height: 3540m. Distance: 20 KM from Pokhara. Day 1: Jeep from Pokhara to Manang. Day 2: Rest and acclimatize in Manang.'
      },
      {
        src: 'Thorongla/Yak Kharka.png',
        alt: 'Yak Kharka',
        caption: '**<strong>Day 3</strong>**: 🐂 Yak Kharka: Serene stop with grazing yaks. Height: 4000m. Hiking Time: 6 hours. Distance: 12 KM. Trek from Manang to Yak Kharka. Recommended Stay: 1 night.'
      },
      {
        src: 'Thorongla/Throng Phedi.png',
        alt: 'Thorong Phedi',
        caption: '**<strong>Day 3</strong>**: ⛺ Thorong Phedi: Base camp before the pass. Height: 4450m. Hiking Time: 3 hours. Distance: 6 KM. Trek from Yak Kharka to Thorong Phedi. Recommended Stay: 1 night.'
      },
      {
        src: 'Thorongla/Thorong-high-Camp.png',
        alt: 'High Camp',
        caption: '**<strong>Day 3 (Optional)</strong>**: 🌄 Thorong High Camp: Optional stay for a shorter summit day. Height: 4900m. Hiking Time: 2 hours. Distance: 4 KM. Trek from Yak Kharka to High Camp. Recommended Stay: 1 night.'
      },
      {
        src: 'Thorongla/Thorong-pass.png',
        alt: 'Thorong La Pass',
        caption: '**<strong>Day 4</strong>**: 🎉 Thorong La Pass: The trek’s highest point! Height: 5416m. Hiking Time: 6 hours. Distance: 15 KM. Trek from Thorong Phedi or High Camp to Thorong La Pass, then descend to Muktinath. Recommended Stay: 0 nights.'
      }
    ];


    const imagePaths = imageGalleryData.map(img => img.src);

    this.firebaseStorageService.getDownloadUrls(imagePaths).subscribe({
      next: (urls) => {
        this.imageUrls = urls.map((url, index) => ({
          url,
          alt: imageGalleryData[index].alt,
          caption: imageGalleryData[index].caption
        }));
      },
      error: (err) => {
        console.error("Error fetching image URLs: ", err);
      }
    });
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

  search(query: string) {
    this.pixabayService.searchImages(query).subscribe((response: any) => {
      this.images = response.hits;
    });
  }
  searchImages(query: string) {
    this.pixabayService.searchImages(query).subscribe(
      (response: any) => {
        this.images = response.hits;
        // Handle empty or error responses appropriately
      },
      error => {
        console.error('Error fetching images: ', error);
        // Handle error
      }
    );
  }

  sanitizeCaption(caption: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(caption);
  }

}
