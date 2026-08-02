import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WeatherService } from '../service/weather.service';
import { PixabayService } from '../service/pixabay.service';
import { FirebaseStorageService } from '../services/firebase-storage.service';
import { Observable, Subject } from 'rxjs';
import { takeUntil, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
    selector: 'app-gokyo',
    templateUrl: './gokyo.component.html',
    styleUrls: ['./gokyo.component.css'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class GokyoComponent implements OnInit, OnDestroy {
  imageUrls: { url: string; alt: string; caption: string }[] = []; // Updated to hold URL, alt, and caption
  videoUrls$!: Observable<string[]>; // Observable for video URLs
  timeInKathmandu: string | undefined;
  temperatureAtEverestBaseCamp: string | undefined;
  temperatureAtAnnapurnaBaseCamp: string | undefined;
  temperatureInKathmandu: string | undefined;
  images: any[] = [];
  searchTerm: string = '';

  private intervals: any[] = [];
  private destroy$ = new Subject<void>();

  constructor(
    private http: HttpClient,
    private weatherService: WeatherService,
    private pixabayService: PixabayService,
    private firebaseStorageService: FirebaseStorageService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.updateKathmanduTime();
    this.intervals.push(setInterval(() => this.updateKathmanduTime(), 1000));

    this.updateKathmanduTemperature();
    this.intervals.push(setInterval(() => this.updateKathmanduTemperature(), 600000));

    this.updateEverestTemperature();
    this.intervals.push(setInterval(() => this.updateEverestTemperature(), 600000));

    this.updateAnnapurnaTemperature();
    this.intervals.push(setInterval(() => this.updateAnnapurnaTemperature(), 600000));

    this.search('gokyo');

    const gokyoGallery = [
      {
        src: 'Everest Basecamp/Lukla.jpg',
        alt: 'Lukla Airport',
        caption: '**<strong>Day 1</strong>**: ✈️ **Lukla** — Begin your Gokyo adventure with a thrilling flight from Kathmandu to Lukla (2,860m). Trek through lush valleys to Phakding, a charming Sherpa village by the Dudh Kosi River. Stop for lunch at a teahouse in Toktok, savoring dal bhat with river views. Overnight in Phakding. Hiking Time: 3–4 hours. Distance: 8 km.'
      },
      {
        src: 'Everest Basecamp/Phakding.jpg',
        alt: 'Phakding Village',
        caption: '**<strong>Day 2</strong>**: 🏞️ **Phakding** — Rise in Phakding (2,610m) and trek to Namche Bazaar, the vibrant Sherpa hub. Cross suspension bridges and ascend through pine forests. Enjoy lunch at a lodge in Monjo, tasting momos with a Himalayan backdrop. Overnight in Namche. Hiking Time: 5–6 hours. Distance: 11 km.'
      },
      {
        src: 'Everest Basecamp/Namche.jpg',
        alt: 'Namche Bazaar',
        caption: '**<strong>Day 3</strong>**: 🛍️ **Namche Bazaar** — Acclimatize in Namche (3,440m), a bustling Sherpa town. Explore local markets or hike to Syangboche for panoramic views. Savor lunch at a Namche bakery, indulging in fresh pastries with Everest glimpses. Overnight in Namche. Recommended Stay: 1 night.'
      },
      {
        src: 'Everest Basecamp/EverestView.jpg',
        alt: 'Everest View Hotel',
        caption: '**<strong>Day 3</strong>**: 🏔️ **Everest View Hotel** — Hike from Namche to the Everest View Hotel (3,880m) during your acclimatization day. Enjoy stunning views of Everest, Lhotse, and Ama Dablam. Lunch at the hotel’s terrace café, sipping tea with the Himalayas in sight. Return to Namche for the night. Hiking Time: 3–4 hours. Distance: 6 km.'
      },
      {
        src: 'Gokyo/To Dole.jpg',
        alt: 'Trail to Dole',
        caption: '**<strong>Day 4</strong>**: 🌲 **To Dole** — Depart Namche and trek toward Dole (4,200m), diverging from the EBC route at Mong La. Pass through rhododendron forests and enjoy views of Thamserku. Stop for lunch at a teahouse in Phortse Tenga, relishing thukpa amidst the forest. Overnight in Dole. Hiking Time: 5–6 hours. Distance: 10 km.'
      },
      {
        src: 'Gokyo/@Dole.jpg',
        alt: 'Dole Village',
        caption: '**<strong>Day 5</strong>**: 🏡 **Dole** — Begin in Dole (4,200m) and trek to Machhermo, following the Dudh Kosi Valley. The trail offers views of Cho Oyu and alpine meadows. Pause for lunch at a lodge in Lhabarma, enjoying garlic soup to warm up. Overnight in Machhermo. Hiking Time: 4–5 hours. Distance: 7 km.'
      },
      {
        src: 'Gokyo/To Mochhermo.jpg',
        alt: 'Machhermo Village',
        caption: '**<strong>Day 5</strong>**: ⛰️ **Machhermo** — Arrive in Machhermo (4,470m), a serene Sherpa village nestled in a valley. The landscape opens up with glacier views. Lunch already enjoyed in Lhabarma (as noted earlier). Prepare for the final push to Gokyo. Overnight in Machhermo.'
      },
      {
        src: 'Gokyo/trekk to Gokyo.jpg',
        alt: 'Trail to Gokyo',
        caption: '**<strong>Day 6</strong>**: 🏞️ **To Gokyo** — Trek from Machhermo to Gokyo (4,790m), passing the stunning Gokyo Lakes. Cross the Ngozumpa Glacier and marvel at turquoise waters. Stop for lunch at a teahouse by the third lake, savoring fried rice with Cho Oyu views. Overnight in Gokyo. Hiking Time: 4–5 hours. Distance: 8 km.'
      },
      {
        src: 'Gokyo/Congrats-Gokyo.jpg',
        alt: 'Gokyo Village',
        caption: '**<strong>Day 6</strong>**: 🎉 **Gokyo** — Celebrate reaching Gokyo (4,790m), a picturesque village by the sacred lakes. Explore the serene lakeside and soak in the tranquility. Lunch enjoyed by the third lake (as noted earlier). Overnight in Gokyo, resting for the Gokyo Ri ascent.'
      },
      {
        src: 'Gokyo/Gokyo Ri.jpg',
        alt: 'Gokyo Ri Summit',
        caption: '**<strong>Day 7</strong>**: 🌅 **Gokyo Ri** — Climb Gokyo Ri (5,357m) for a sunrise view of Everest, Makalu, and Cho Oyu—the trek’s highlight! Descend to Gokyo for breakfast, then trek to Phortse. Enjoy lunch at a teahouse in Thare, tasting noodle soup with valley views. Overnight in Phortse. Hiking Time: 7–8 hours. Distance: 14 km.'
      },
      {
        src: 'Gokyo/Thank You Gokyo Ri.jpg',
        alt: 'Thank You Gokyo Ri',
        caption: '**<strong>Day 7</strong>**: 🙏 **Thank You Gokyo Ri** — Reflect on your Gokyo Ri ascent (5,357m) as you descend to Phortse (3,810m). The trail offers a final glimpse of the lakes and peaks. Lunch already enjoyed in Thare (as noted earlier). Overnight in Phortse, cherishing the memories.'
      },
      {
        src: 'Everest Basecamp/Suggestation.jpg',
        alt: 'Return to Namche',
        caption: '**<strong>Day 8</strong>**: 🔙 **Return to Namche** — Trek from Phortse to Namche Bazaar (3,440m), passing through Mong La with views of Ama Dablam. Stop for lunch at a teahouse in Khumjung, indulging in Sherpa stew with local warmth. Overnight in Namche or continue to Lukla. Hiking Time: 5–6 hours. Distance: 12 km.'
      },
      {
        src: 'Gokyo/Golden Ducks.jpg',
        alt: 'Golden Ducks Sighting',
        caption: '**<strong>Day 8</strong>**: 🦆 **Golden Ducks** — Spot the rare golden ducks (Brahminy Ducks) along the Dudh Kosi River while descending from Namche to Lukla. A delightful moment of nature’s beauty. Lunch already enjoyed in Khumjung (as noted earlier). Overnight in Lukla or fly back to Kathmandu.'
      },
      {
        src: 'Gokyo/returning.jpg',
        alt: 'Return to Lukla',
        caption: '**<strong>Day 8</strong>**: ✈️ **Return to Lukla** — Complete your descent from Namche to Lukla (2,860m), retracing your steps through Phakding. Celebrate your Gokyo journey with a farewell dinner in Lukla. Fly back to Kathmandu the next day. Hiking Time: 6–7 hours (from Namche). Distance: 19 km.'
      }
    ];

    const imagePaths = gokyoGallery.map(img => img.src);

    const videoPaths = [
      'Everest Basecamp/Yak.MOV',
      'Gokyo/MVI_9671.MP4',
      'Gokyo/Ri.MOV'
    ];

    // Fetch Firebase images and map to gallery entries
    this.firebaseStorageService.getDownloadUrls(imagePaths).pipe(
      catchError(error => {
        console.error('Error fetching Gokyo image URLs:', error);
        return of([]);
      }),
      takeUntil(this.destroy$)
    ).subscribe(urls => {
      this.imageUrls = urls.map((url, i) => ({
        url,
        alt: gokyoGallery[i].alt,
        caption: gokyoGallery[i].caption
      }));
    });

    // Fetch Firebase videos as Observable
    this.videoUrls$ = this.firebaseStorageService.getDownloadUrls(videoPaths).pipe(
      catchError(error => {
        console.error('Error fetching Gokyo video URLs:', error);
        return of([]);
      }),
      takeUntil(this.destroy$)
    );
  }

  sanitizeCaption(caption: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(caption);
  }

  // Rest of the methods (updateKathmanduTime, updateKathmanduTemperature, etc.) remain unchanged
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

  searchImages(query: string) {
    this.search(query);
  }
}
