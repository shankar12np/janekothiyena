import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { WelcomeComponent } from './welcome/welcome.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { provideHttpClient, withInterceptorsFromDi, withXhr } from "@angular/common/http";
import { TrekkingComponent } from './trekking/trekking.component';
import {FormsModule} from "@angular/forms";
import { MarqueeSectionComponent } from './marquee-section/marquee-section.component';
import { EverestTrekkingComponent } from './everest-trekking/everest-trekking.component';
import { TrekkingPrepComponent } from './trekking-prep/trekking-prep.component';
import { SearchImagesComponent } from './search-images/search-images.component';
import {AngularFireModule} from "@angular/fire/compat";
import {environment} from "../environments/environment.development";
import { BollywoodMoviesComponent } from './bollywood-movies/bollywood-movies.component';
import { BollywoodTvShowsComponent } from './bollywood-tv-shows/bollywood-tv-shows.component';
import { NepaliMoviesComponent } from './nepali-movies/nepali-movies.component';
import { NewsComponent } from './news/news.component';
import { NepaliSahityaComponent } from './nepali-sahitya/nepali-sahitya.component';
import { RadhaPiyariComponent } from './radha-piyari/radha-piyari.component';
import { SaniComponent } from './sani/sani.component';
import { RajabadiNewsComponent } from './rajabadi-news/rajabadi-news.component';
import {GokyoComponent} from "./gokyo/gokyo.component";
import { ThoronglaPassComponent } from './thorongla-pass/thorongla-pass.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    HeaderComponent,
    FooterComponent,
    TrekkingComponent,
    MarqueeSectionComponent,
    EverestTrekkingComponent,
    TrekkingPrepComponent,
    SearchImagesComponent,
    BollywoodMoviesComponent,
    BollywoodTvShowsComponent,
    GokyoComponent,
    NepaliMoviesComponent,
    NewsComponent,
    NepaliSahityaComponent,
    RadhaPiyariComponent,
    SaniComponent,
    RajabadiNewsComponent,
    ThoronglaPassComponent
  ],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase)
  ],
  providers: [provideHttpClient(withXhr(), withInterceptorsFromDi())]
})
export class AppModule { }
