import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { WelcomeComponent } from './welcome/welcome.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { provideHttpClient, withInterceptorsFromDi, withXhr } from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import { MarqueeSectionComponent } from './marquee-section/marquee-section.component';
import {AngularFireModule} from "@angular/fire/compat";
import {environment} from "../environments/environment.development";

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    HeaderComponent,
    FooterComponent,
    MarqueeSectionComponent
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
