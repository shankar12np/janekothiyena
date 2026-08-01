import { Component } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { WeatherService } from "../service/weather.service";
import { PixabayService } from "../service/pixabay.service";
import { FirebaseStorageService } from "../services/firebase-storage.service";
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";

@Component({
    selector: 'app-trekking',
    templateUrl: './trekking.component.html',
    styleUrls: ['./trekking.component.css'],
    standalone: false
})
export class TrekkingComponent {
  ttimeInKathmandu!: string;
  temperatureAtEverestBaseCamp!: string;
  temperatureAtAnnapurnaBaseCamp!: string;
  temperatureInKathmandu!: string;
  images: any[] = [];
  searchTerm: string = '';

  imageUrls: { url: string; alt: string; caption: string }[] = [];

  constructor(
    private http: HttpClient,
    private weatherService: WeatherService,
    private pixabayService: PixabayService,
    private firebaseStorageService: FirebaseStorageService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.updateKathmanduTime();
    setInterval(() => this.updateKathmanduTime(), 1000);

    this.updateKathmanduTemperature();
    setInterval(() => this.updateKathmanduTemperature(), 600000);

    this.updateEverestTemperature();
    setInterval(() => this.updateEverestTemperature(), 600000);

    this.updateAnnapurnaTemperature();
    setInterval(() => this.updateAnnapurnaTemperature(), 600000);

    this.search('Annapurna Base Camp Trekking Landscape');


    const annapurnaGallery = [
      {
        src: 'Everest Basecamp/Annapurna Basecamp/jeep.jpg',
        alt: 'Jeep ride to Jhinu Danda',
        caption: '**<strong>Day 1</strong>**: 🚙 **Jeep Ride to Jhinu Danda** — Kick off your Annapurna Base Camp adventure with a scenic jeep ride from Baglung Bus Park, Pokhara to Jhinu Danda (1,780m). The 3–4 hour drive winds through terraced hills and villages, setting the stage for your trek.'
      },
      {
        src: 'Everest Basecamp/Annapurna Basecamp/Jhinu.jpg',
        alt: 'Jhinu Danda Hot Springs',
        caption: '**<strong>Day 1</strong>**: 🌿 **Jhinu Danda** — Begin your trek from Jhinu Danda (1,780m), famous for its soothing hot springs by the Modi Khola River. Trek to Sinuwa via Chhomrong, crossing suspension bridges. Stop for lunch at a cozy teahouse in Chhomrong, savoring dal bhat with mountain views. Overnight in Sinuwa. Hiking Time: 5–6 hours. Distance: 8 km.'
      },
      {
        src: 'Everest Basecamp/Annapurna Basecamp/Sinuwa.jpg',
        alt: 'Sinuwa Village',
        caption: '**<strong>Day 2</strong>**: 🏞️ **Sinuwa** — A tranquil village at 2,340m overlooking the Modi Khola valley. Trek through dense rhododendron forests to Deurali, with magical views of snow-capped peaks. Pause for lunch at a welcoming lodge in Bamboo, enjoying a warm bowl of thukpa amidst the forest. Overnight in Deurali. Hiking Time: 6–7 hours. Distance: 14 km.'
      },
      {
        src: 'Everest Basecamp/Annapurna Basecamp/Deurali.jpg',
        alt: 'Deurali Viewpoint',
        caption: '**<strong>Day 3</strong>**: 🌄 **Deurali** — At 3,200m, Deurali offers rugged alpine landscapes and a sense of remoteness. Trek through the Annapurna Sanctuary to Machhapuchhre Base Camp (MBC) and on to ABC. Enjoy lunch at a teahouse in MBC, refueling with momos while gazing at the peaks. Overnight in ABC. Hiking Time: 4–5 hours. Distance: 9 km.'
      },
      {
        src: 'Everest Basecamp/Annapurna Basecamp/MachhaPuchhre.jpg',
        alt: 'Machhapuchhre Base Camp (MBC)',
        caption: '**<strong>Day 3</strong>**: 🏔️ **Machhapuchhre Base Camp** — Reach MBC at 3,700m beneath the sacred Fishtail Peak (Machhapuchhre). Enjoy stunning views of Annapurna South and Hiunchuli as you approach ABC, a short trek away. Lunch at MBC (as noted earlier) fuels your final push to ABC. Overnight in ABC.'
      },
      {
        src: 'Everest Basecamp/Annapurna Basecamp/Aannapurna.jpg',
        alt: 'Annapurna Base Camp',
        caption: '**<strong>Day 3</strong>**: 🎉 **Annapurna Base Camp (ABC)** — Celebrate reaching ABC at 4,130m, nestled in a breathtaking amphitheater of peaks. Wake early for a magical sunrise over Annapurna I, with 360° views of Himalayan giants. Savor lunch at ABC’s teahouse, indulging in hot garlic soup with Himalayan vistas. Overnight in ABC.'
      },
      {
        src: 'Everest Basecamp/Annapurna Basecamp/Descent.jpg',
        alt: 'Return from ABC',
        caption: '**<strong>Days 4–5</strong>**: 🔁 **Descent from ABC** — Descend to Bamboo (2,300m) on Day 4 (6–7 hours, 15 km), stopping for lunch at a teahouse in Deurali with fried rice to recharge. On Day 5, trek to Jhinu Danda (4–5 hours, 10 km), enjoying lunch in Chhomrong with a hearty noodle soup. Relax at Jhinu’s hot springs before taking a jeep from Jhinu Danda back to Baglung Bus Park, Pokhara (3–4 hours).'
      }
    ];

    const imagePaths = annapurnaGallery.map(img => img.src);



    this.firebaseStorageService.getDownloadUrls(imagePaths).subscribe({
      next: (urls) => {
        console.log('Firebase URLs returned:', urls); // Debug the URLs
        console.log('Number of URLs:', urls.length); // Check how many URLs were returned
        console.log('Expected number of images:', imagePaths.length); // Should be 7

        this.imageUrls = urls.map((url, i) => {
          console.log(`Mapping URL ${i}: ${url}`); // Debug each URL being mapped
          return {
            url,
            alt: annapurnaGallery[i].alt,
            caption: annapurnaGallery[i].caption
          };
        });
        console.log('Final imageUrls:', this.imageUrls); // Debug the final imageUrls array
      },
      error: (err) => {
        console.error("Error fetching image URLs: ", err);
      }
    });
  }

  sanitizeCaption(caption: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(caption);
  }

  updateKathmanduTime() {
    this.http.get<any>('http://worldtimeapi.org/api/timezone/Asia/Kathmandu')
      .subscribe(data => {
        let timeString = data.datetime.split('T')[1].split('+')[0];
        let time = new Date('1970-01-01T' + timeString + 'Z');
        let hours = time.getUTCHours();
        let minutes = time.getUTCMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12;
        const strHours = hours < 10 ? `0${hours}` : hours.toString();
        const strMinutes = minutes < 10 ? `0${minutes}` : minutes.toString();

        this.ttimeInKathmandu = `${strHours}:${strMinutes} ${ampm}`;
      });
  }

  updateKathmanduTemperature() {
    const apiKey = 'd8b4f176d89cc65db9f674b88ae1e72e';
    this.weatherService.getKathmanduWeather(apiKey)
      .subscribe(data => {
        this.temperatureInKathmandu = data.main.temp + ' °C';
      }, error => {
        console.error('Error fetching Kathmandu weather data: ', error);
      });
  }

  updateEverestTemperature() {
    const apiKey = 'd8b4f176d89cc65db9f674b88ae1e72e';
    this.weatherService.getEverestBaseCampWeather(apiKey)
      .subscribe(data => {
        this.temperatureAtEverestBaseCamp = data.main.temp + ' °C';
      }, error => {
        console.error('Error fetching the weather data: ', error);
      });
  }

  updateAnnapurnaTemperature() {
    const apiKey = 'd8b4f176d89cc65db9f674b88ae1e72e';
    this.weatherService.getAnnapurnaBaseCampWeather(apiKey)
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
      },
      error => {
        console.error('Error fetching images: ', error);
      }
    );
  }
}
