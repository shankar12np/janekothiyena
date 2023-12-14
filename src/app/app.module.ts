import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { WelcomeComponent } from './welcome/welcome.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { PostYourKnowledgeComponent } from './post-your-knowledge/post-your-knowledge.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { NewInCommunityComponent } from './new-in-community/new-in-community.component';
import { HealthTipsComponent } from './health-tips/health-tips.component';
import { YogaComponent } from './yoga/yoga.component';
import { BanksAndCreditCardsComponent } from './banks-and-credit-cards/banks-and-credit-cards.component';
import { LegalHelpComponent } from './legal-help/legal-help.component';
import { RealEstateComponent } from './real-estate/real-estate.component';
import { DeadlinesComponent } from './deadlines/deadlines.component';
import { ItJobHelpComponent } from './it-job-help/it-job-help.component';
import { ImmigrationsHelpComponent } from './immigrations-help/immigrations-help.component';
import { HappningNowComponent } from './happning-now/happning-now.component';
import { UpComingEventComponent } from './up-coming-event/up-coming-event.component';
import {HttpClientModule} from "@angular/common/http";
import { TrekkingComponent } from './trekking/trekking.component';
import {FormsModule} from "@angular/forms";
import { NepaleseOwnBusinessComponent } from './nepalese-own-business/nepalese-own-business.component';
import { NewYorkComponent } from './new-york/new-york.component';
import { LosAngelesComponent } from './los-angeles/los-angeles.component';
import { DallasTexasComponent } from './dallas-texas/dallas-texas.component';
import { BaltimoreComponent } from './baltimore/baltimore.component';
import { NepaleseOwnedBusinessNewyorkComponent } from './nepalese-owned-business-newyork/nepalese-owned-business-newyork.component';
import { NepaleseOwnedBusinessDallasComponent } from './nepalese-owned-business-dallas/nepalese-owned-business-dallas.component';
import { NepaleseOwnedBusinessLAComponent } from './nepalese-owned-business-la/nepalese-owned-business-la.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    HeaderComponent,
    FooterComponent,
    PostYourKnowledgeComponent,
    AboutUsComponent,
    ContactUsComponent,
    NewInCommunityComponent,
    HealthTipsComponent,
    YogaComponent,
    BanksAndCreditCardsComponent,
    LegalHelpComponent,
    RealEstateComponent,
    DeadlinesComponent,
    ItJobHelpComponent,
    ImmigrationsHelpComponent,
    HappningNowComponent,
    UpComingEventComponent,
    TrekkingComponent,
    NepaleseOwnBusinessComponent,
    NewYorkComponent,
    LosAngelesComponent,
    DallasTexasComponent,
    BaltimoreComponent,
    NepaleseOwnedBusinessNewyorkComponent,
    NepaleseOwnedBusinessDallasComponent,
    NepaleseOwnedBusinessLAComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
