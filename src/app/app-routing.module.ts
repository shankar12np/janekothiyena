import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {WelcomeComponent} from "./welcome/welcome.component";
import {MarqueeSectionComponent} from "./marquee-section/marquee-section.component";

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

  { path: 'everest-trekking', loadChildren: () => import('./everest-trekking/everest-trekking.module').then(m => m.EverestTrekkingModule) },
  { path: 'trekking-prep', loadChildren: () => import('./trekking-prep/trekking-prep.module').then(m => m.TrekkingPrepModule) },
  { path: 'gokyo', loadChildren: () => import('./gokyo/gokyo.module').then(m => m.GokyoModule) },
  { path: 'thorongla', loadChildren: () => import('./thorongla-pass/thorongla-pass.module').then(m => m.ThoronglaPassModule) },
  { path: 'bollywood', loadChildren: () => import('./bollywood-movies/bollywood-movies.module').then(m => m.BollywoodMoviesModule) },
  { path: 'bollywood-tv-shows', loadChildren: () => import('./bollywood-tv-shows/bollywood-tv-shows.module').then(m => m.BollywoodTvShowsModule) },

  { path: 'trekking', loadChildren: () => import('./trekking/trekking.module').then(m => m.TrekkingModule) },
  { path: 'search--images', loadChildren: () => import('./search-images/search-images.module').then(m => m.SearchImagesModule) },
  { path: 'nepali-movies', loadChildren: () => import('./nepali-movies/nepali-movies.module').then(m => m.NepaliMoviesModule) },
  { path: 'news', loadChildren: () => import('./news/news.module').then(m => m.NewsModule) },
  { path: 'nepali-sahitya', loadChildren: () => import('./nepali-sahitya/nepali-sahitya.module').then(m => m.NepaliSahityaModule) },
  { path: 'radha-piyari', loadChildren: () => import('./radha-piyari/radha-piyari.module').then(m => m.RadhaPiyariModule) },
  { path: 'sani', loadChildren: () => import('./sani/sani.module').then(m => m.SaniModule) },
  { path: 'rajabadi', loadChildren: () => import('./rajabadi-news/rajabadi-news.module').then(m => m.RajabadiNewsModule) },

  {path:'marquee', component: MarqueeSectionComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabledBlocking'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
