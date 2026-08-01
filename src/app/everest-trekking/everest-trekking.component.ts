import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WeatherService } from '../service/weather.service';
import { PixabayService } from '../service/pixabay.service';
import { DomSanitizer, SafeResourceUrl, SafeHtml } from '@angular/platform-browser';
import { FirebaseStorageService } from '../services/firebase-storage.service';
import { Observable, Subject } from 'rxjs';
import { takeUntil, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
    selector: 'app-everest-trekking',
    templateUrl: './everest-trekking.component.html',
    styleUrls: ['./everest-trekking.component.css'],
    standalone: false
})
export class EverestTrekkingComponent implements OnInit, OnDestroy {
  imageUrls$!: Observable<string[]>;
  imagesError: string | null = null;
  timeInKathmandu!: string;
  temperatureAtEverestBaseCamp!: string;
  temperatureAtAnnapurnaBaseCamp!: string;
  temperatureInKathmandu!: string;
  imageUrls: { url: string; alt: string; caption: string }[] = [];
  images: any[] = [];
  searchTerm: string = '';
  videoUrl!: SafeResourceUrl;
  private intervals: any[] = [];
  private destroy$ = new Subject<void>();

  constructor(
    private http: HttpClient,
    private weatherService: WeatherService,
    private pixabayService: PixabayService,
    private sanitizer: DomSanitizer,
    private firebaseStorageService: FirebaseStorageService
  ) {
    const publicVideoUrl = 'https://firebasestorage.googleapis.com/v0/b/web-thahathiyena.appspot.com/o/Everest%20Basecamp%2FYak.MOV?alt=media';
    this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(publicVideoUrl);
  }

  ngOnInit() {
    this.updateKathmanduTime();
    this.intervals.push(setInterval(() => this.updateKathmanduTime(), 1000));

    this.updateKathmanduTemperature();
    this.intervals.push(setInterval(() => this.updateKathmanduTemperature(), 600000));

    this.updateEverestTemperature();
    this.intervals.push(setInterval(() => this.updateEverestTemperature(), 600000));

    this.updateAnnapurnaTemperature();
    this.intervals.push(setInterval(() => this.updateAnnapurnaTemperature(), 600000));

    this.search('Everest Base Camp trek Nepal landscape mountains');

    const imageGalleryData = [
      {
        src: 'Everest Basecamp/Lukla.jpg',
        alt: 'Lukla Airport',
        caption: '**<strong>Day 1</strong>**: ✈️ Lukla to Phakding — Start your Everest adventure with a scenic 35-minute flight from Kathmandu to Lukla (2,860m). Enjoy breakfast at Buddha Lodge near the airstrip, then trek through lush green valleys to the riverside village of Phakding (2,610m). Overnight stay.  \n🥾 Hiking Time: 3–4 hrs | 📏 Distance: 8 km'
      },
      {
        src: 'Everest Basecamp/Phakding.jpg',
        alt: 'Phakding Village',
        caption: '**<strong>Day 2</strong>**: 🏞️ Phakding to Namche Bazaar — Follow the Dudh Kosi River, crossing suspension bridges and ascending through pine forests to reach Namche Bazaar (3,440m), the Sherpa capital.  \n🥾 Hiking Time: 5–6 hrs | 📏 Distance: 11 km'
      },
      {
        src: 'Everest Basecamp/Namche.jpg',
        alt: 'Namche Bazaar',
        caption: '**<strong>Day 3</strong>**: 🛍️ Namche Acclimatization — Rest day at Namche (3,440m). Take a short hike to the Everest View Hotel (3,880m) for your first glimpse of Everest and Ama Dablam. Return to Namche for overnight.  \n🥾 Hiking Time: 3–4 hrs | 📏 Distance: 6 km'
      },
      {
        src: 'Everest Basecamp/Tenboche.jpg',
        alt: 'Tengboche Monastery',
        caption: '**<strong>Day 4</strong>**: 🙏 Namche to Tengboche — Trek through forests and cross suspension bridges to reach Tengboche (3,860m), home to the region’s most revered monastery with stunning panoramic views.  \n🥾 Hiking Time: 5–6 hrs | 📏 Distance: 10 km'
      },
      {
        src: 'Everest Basecamp/Dingboche.jpg',
        alt: 'Dingboche Village',
        caption: '**<strong>Day 5</strong>**: 🌾 Tengboche to Dingboche — Ascend through rhododendron forests and alpine terrain to reach Dingboche (4,410m), a beautiful high-altitude village surrounded by majestic peaks.  \n🥾 Hiking Time: 5–6 hrs | 📏 Distance: 12 km'
      },
      {
        src: 'Everest Basecamp/dingbocheRest.jpg',
        alt: 'Dingboche Acclimatization',
        caption: '**<strong>Day 6</strong>**: ⛰️ Acclimatization Day — Take a break in Dingboche (4,410m). Optional hike to Nangkartshang Ridge for spectacular mountain views.  \n🛏️ Recommended: 2-night stay for acclimatization.'
      },
      {
        src: 'Everest Basecamp/EverestMemorials.jpg',
        alt: 'Chukpi Lhara Memorials',
        caption: '**<strong>Day 7</strong>**: 🕉️ Chukpi Lhara (Everest Memorial): A solemn site with Sherpa memorials honoring climbers who perished on Everest. Height: 4750m. Trek from Dingboche to Lobuche, then proceed to the Pyramid Research Station. Overnight at Pyramid Research Station.  \n🥾 Hiking Time: 4–5 hrs | 📏 Distance: 8 km.'
      },
      {
        src: 'Everest Basecamp/Pyramid.jpg',
        alt: 'Pyramid Research Station',
        caption: '**<strong>Day 8</strong>**: 🔬 Pyramid to Gorak Shep — Trek from the Italian Pyramid Research Station (5,050m) to Gorak Shep (5,164m). Have lunch and prepare for the Everest Base Camp hike.  \n🥾 Hiking Time: 3–4 hrs | 📏 Distance: 7 km'
      },
      {
        src: 'Everest Basecamp/GroakShep.jpg',
        alt: 'Gorak Shep',
        caption: '**<strong>Day 8</strong>**: 🏕️ Everest Base Camp Hike — After lunch at Gorak Shep, hike to Everest Base Camp (5,364m) and return. Overnight in Gorak Shep.  \n🥾 Hiking Time: 6–8 hrs | 📏 Distance: 12 km'
      },
      {
        src: 'Everest Basecamp/EBC.jpg',
        alt: 'Everest Base Camp',
        caption: '**<strong>🥾 Everest Base Camp: Your dream comes true at the foot of the world’s highest peak! Height: 5364m</strong>**: Celebrate this monumental achievement amidst the Himalayan grandeur, then return to Gorak Shep, carrying unforgettable memories. Hiking Time: 5–6 hours. Distance: 10 km.'
      },
      {
        src: 'Everest Basecamp/Suggestation.jpg',
        alt: 'Kala Patthar',
        caption: '**<strong>Day 9</strong>**: 🌅 Kala Patthar to Pheriche — Optional sunrise hike to Kala Patthar (5,550m) for the best view of Everest, then descend to Pheriche (4,280m).  \n🥾 Hiking Time: 7–8 hrs | 📏 Distance: 14 km'
      }
    ];


    // Fetch Firebase Storage URLs
    const imagePaths = imageGalleryData.map(img => img.src);
    this.firebaseStorageService.getDownloadUrls(imagePaths).pipe(
      catchError(error => {
        console.error('Error fetching trekking images:', error);
        this.imagesError = 'Failed to load trekking images';
        return of([]);
      }),
      takeUntil(this.destroy$)
    ).subscribe(urls => {
      this.imageUrls = urls.map((url, index) => ({
        url,
        alt: imageGalleryData[index].alt,
        caption: imageGalleryData[index].caption
      }));
    });
  }

  // Existing methods (updateKathmanduTime, etc.) remain unchanged
  // Add sanitizeCaption
  sanitizeCaption(caption: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(caption);
  }

  ngOnDestroy() {
    this.intervals.forEach(clearInterval);
    this.destroy$.next();
    this.destroy$.complete();
  }

  updateKathmanduTime() {
    this.http.get<any>('http://worldtimeapi.org/api/timezone/Asia/Kathmandu')
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: data => {
          const timeString = data.datetime.split('T')[1].split('+')[0];
          const time = new Date('1970-01-01T' + timeString + 'Z');
          const hours = time.getUTCHours() % 12 || 12;
          const minutes = time.getUTCMinutes();
          const ampm = time.getUTCHours() >= 12 ? 'PM' : 'AM';
          this.timeInKathmandu = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${ampm}`;
        },
        error: error => console.error('Error fetching Kathmandu time:', error)
      });
  }

  updateKathmanduTemperature() {
    const apiKey = 'd8b4f176d89cc65db9f674b88ae1e72e';
    this.weatherService.getKathmanduWeather(apiKey)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: data => this.temperatureInKathmandu = `${data.main.temp} °C`,
        error: error => console.error('Error fetching Kathmandu weather:', error)
      });
  }

  updateEverestTemperature() {
    const apiKey = 'd8b4f176d89cc65db9f674b88ae1e72e';
    this.weatherService.getEverestBaseCampWeather(apiKey)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: data => this.temperatureAtEverestBaseCamp = `${data.main.temp} °C`,
        error: error => console.error('Error fetching Everest weather:', error)
      });
  }

  updateAnnapurnaTemperature() {
    const apiKey = 'd8b4f176d89cc65db9f674b88ae1e72e';
    this.weatherService.getAnnapurnaBaseCampWeather(apiKey)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: data => this.temperatureAtAnnapurnaBaseCamp = `${data.main.temp} °C`,
        error: error => console.error('Error fetching Annapurna weather:', error)
      });
  }

  search(query: string) {
    this.pixabayService.searchImages(query)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response: any) => this.images = response.hits,
        error: error => console.error('Error fetching Pixabay images:', error)
      });
  }

  handleImageSelection(image: any) {
    console.log('Selected image:', image);
  }

  getSafeUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
