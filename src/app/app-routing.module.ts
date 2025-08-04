import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {WelcomeComponent} from "./welcome/welcome.component";
import {PostYourKnowledgeComponent} from "./post-your-knowledge/post-your-knowledge.component";
import {AboutUsComponent} from "./about-us/about-us.component";
import {ContactUsComponent} from "./contact-us/contact-us.component";
import {NewInCommunityComponent} from "./new-in-community/new-in-community.component";
import {HealthTipsComponent} from "./health-tips/health-tips.component";
import {YogaComponent} from "./yoga/yoga.component";
import {BanksAndCreditCardsComponent} from "./banks-and-credit-cards/banks-and-credit-cards.component";
import {LegalHelpComponent} from "./legal-help/legal-help.component";
import {RealEstateComponent} from "./real-estate/real-estate.component";
import {DeadlinesComponent} from "./deadlines/deadlines.component";
import {ItJobHelpComponent} from "./it-job-help/it-job-help.component";
import {ImmigrationsHelpComponent} from "./immigrations-help/immigrations-help.component";
import {HappningNowComponent} from "./happning-now/happning-now.component";
import {UpComingEventComponent} from "./up-coming-event/up-coming-event.component";
import {TrekkingComponent} from "./trekking/trekking.component";
import {NepaleseOwnBusinessComponent} from "./nepalese-own-business/nepalese-own-business.component";
import {NewYorkComponent} from "./new-york/new-york.component";
import {LosAngelesComponent} from "./los-angeles/los-angeles.component";
import {DallasTexasComponent} from "./dallas-texas/dallas-texas.component";
import {BaltimoreComponent} from "./baltimore/baltimore.component";
import {
  NepaleseOwnedBusinessNewyorkComponent
} from "./nepalese-owned-business-newyork/nepalese-owned-business-newyork.component";
import {
  NepaleseOwnedBusinessDallasComponent
} from "./nepalese-owned-business-dallas/nepalese-owned-business-dallas.component";
import {NepaleseOwnedBusinessLAComponent} from "./nepalese-owned-business-la/nepalese-owned-business-la.component";
import {ArjunBiographyComponent} from "./arjun-biography/arjun-biography.component";
import {DmvJobsComponent} from "./dmv-jobs/dmv-jobs.component";
import {MarqueeSectionComponent} from "./marquee-section/marquee-section.component";
import {EverestTrekkingComponent} from "./everest-trekking/everest-trekking.component";
import {TrekkingPrepComponent} from "./trekking-prep/trekking-prep.component";
import {SearchImagesComponent} from "./search-images/search-images.component";
import {BollywoodMoviesComponent} from "./bollywood-movies/bollywood-movies.component";
import {BollywoodTvShowsComponent} from "./bollywood-tv-shows/bollywood-tv-shows.component";
import {GokyoComponent} from "./gokyo/gokyo.component";
import {NepaliMoviesComponent} from "./nepali-movies/nepali-movies.component";
import {NewsComponent} from "./news/news.component";
import {NepaliSahityaComponent} from "./nepali-sahitya/nepali-sahitya.component";
import {RadhaPiyariComponent} from "./radha-piyari/radha-piyari.component";
import {SaniComponent} from "./sani/sani.component";
import {RajabadiNewsComponent} from "./rajabadi-news/rajabadi-news.component";
import {ThoronglaPassComponent} from "./thorongla-pass/thorongla-pass.component";

  const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'post', component: PostYourKnowledgeComponent },
  { path: 'about', component: AboutUsComponent },
  { path: 'contact', component: ContactUsComponent },
  { path: 'new-in-community', component: NewInCommunityComponent },
  { path: 'health-tips', component: HealthTipsComponent },
  { path: 'yoga', component: YogaComponent },
  { path: 'banks-and-credit-cards', component: BanksAndCreditCardsComponent },
  { path: 'legal-help', component: LegalHelpComponent },
  { path: 'real-estate', component: RealEstateComponent },
  { path: 'deadlines', component: DeadlinesComponent },
  { path: 'it-job-help', component: ItJobHelpComponent },
  { path: 'immigrations-help', component: ImmigrationsHelpComponent },
  {path: 'happening-now', component: HappningNowComponent},
  {path: 'up-coming-event', component: UpComingEventComponent},
  {path: 'trekking', component: TrekkingComponent},
  {path: 'nepalese-own-business', component: NepaleseOwnBusinessComponent},
  {path: 'new-york', component: NewYorkComponent},
  {path: 'los-angeles', component: LosAngelesComponent},
  {path: 'dallas', component: DallasTexasComponent},
  {path: 'baltimore', component: BaltimoreComponent},
  {path: 'nepalese-owned-business-newyork', component: NepaleseOwnedBusinessNewyorkComponent},
  {path: 'nepalese-owned-business-dallas', component: NepaleseOwnedBusinessDallasComponent},
  {path: 'nepalese-owned-business-la', component : NepaleseOwnedBusinessLAComponent},
  {path: 'arjun-biography', component: ArjunBiographyComponent},
  {path:'dmv-jobs', component: DmvJobsComponent},
  {path:'marquee', component: MarqueeSectionComponent},
  {path: 'everest-trekking', component: EverestTrekkingComponent},
  {path: 'trekking-prep', component: TrekkingPrepComponent},
  {path: 'gokyo', component: GokyoComponent},
  {path: 'search--images', component: SearchImagesComponent},
  {path: 'bollywood', component: BollywoodMoviesComponent},
  {path: 'bollywood-tv-shows', component: BollywoodTvShowsComponent},
  {path: 'nepali-movies', component: NepaliMoviesComponent},
  {path: 'news', component: NewsComponent},
  {path: 'nepali-sahitya', component: NepaliSahityaComponent},
    {path: 'radha-piyari', component: RadhaPiyariComponent},
    {path: 'sani', component: SaniComponent},
    {path: 'rajabadi', component: RajabadiNewsComponent},
    {path: 'thorongla', component: ThoronglaPassComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabledBlocking'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
