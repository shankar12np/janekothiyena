import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {WelcomeComponent} from "./welcome/welcome.component";
import {TrekkingComponent} from "./trekking/trekking.component";
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

  { path: 'post', loadChildren: () => import('./post-your-knowledge/post-your-knowledge.module').then(m => m.PostYourKnowledgeModule) },
  { path: 'about', loadChildren: () => import('./about-us/about-us.module').then(m => m.AboutUsModule) },
  { path: 'contact', loadChildren: () => import('./contact-us/contact-us.module').then(m => m.ContactUsModule) },
  { path: 'new-in-community', loadChildren: () => import('./new-in-community/new-in-community.module').then(m => m.NewInCommunityModule) },
  { path: 'health-tips', loadChildren: () => import('./health-tips/health-tips.module').then(m => m.HealthTipsModule) },
  { path: 'yoga', loadChildren: () => import('./yoga/yoga.module').then(m => m.YogaModule) },

  { path: 'banks-and-credit-cards', loadChildren: () => import('./banks-and-credit-cards/banks-and-credit-cards.module').then(m => m.BanksAndCreditCardsModule) },
  { path: 'legal-help', loadChildren: () => import('./legal-help/legal-help.module').then(m => m.LegalHelpModule) },
  { path: 'real-estate', loadChildren: () => import('./real-estate/real-estate.module').then(m => m.RealEstateModule) },
  { path: 'deadlines', loadChildren: () => import('./deadlines/deadlines.module').then(m => m.DeadlinesModule) },
  { path: 'it-job-help', loadChildren: () => import('./it-job-help/it-job-help.module').then(m => m.ItJobHelpModule) },
  { path: 'immigrations-help', loadChildren: () => import('./immigrations-help/immigrations-help.module').then(m => m.ImmigrationsHelpModule) },

  { path: 'happening-now', loadChildren: () => import('./happning-now/happning-now.module').then(m => m.HappningNowModule) },
  { path: 'up-coming-event', loadChildren: () => import('./up-coming-event/up-coming-event.module').then(m => m.UpComingEventModule) },
  { path: 'nepalese-own-business', loadChildren: () => import('./nepalese-own-business/nepalese-own-business.module').then(m => m.NepaleseOwnBusinessModule) },
  { path: 'new-york', loadChildren: () => import('./new-york/new-york.module').then(m => m.NewYorkModule) },
  { path: 'los-angeles', loadChildren: () => import('./los-angeles/los-angeles.module').then(m => m.LosAngelesModule) },
  { path: 'dallas', loadChildren: () => import('./dallas-texas/dallas-texas.module').then(m => m.DallasTexasModule) },

  { path: 'baltimore', loadChildren: () => import('./baltimore/baltimore.module').then(m => m.BaltimoreModule) },
  { path: 'nepalese-owned-business-newyork', loadChildren: () => import('./nepalese-owned-business-newyork/nepalese-owned-business-newyork.module').then(m => m.NepaleseOwnedBusinessNewyorkModule) },
  { path: 'nepalese-owned-business-dallas', loadChildren: () => import('./nepalese-owned-business-dallas/nepalese-owned-business-dallas.module').then(m => m.NepaleseOwnedBusinessDallasModule) },
  { path: 'nepalese-owned-business-la', loadChildren: () => import('./nepalese-owned-business-la/nepalese-owned-business-la.module').then(m => m.NepaleseOwnedBusinessLAModule) },
  { path: 'arjun-biography', loadChildren: () => import('./arjun-biography/arjun-biography.module').then(m => m.ArjunBiographyModule) },
  { path: 'dmv-jobs', loadChildren: () => import('./dmv-jobs/dmv-jobs.module').then(m => m.DmvJobsModule) },

  {path: 'trekking', component: TrekkingComponent},
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
