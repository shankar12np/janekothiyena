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
  {path: 'up-coming-event', component: UpComingEventComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
