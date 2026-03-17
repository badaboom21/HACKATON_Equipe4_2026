import { Routes } from '@angular/router';
import { SaisieRelevesComponent } from './saisie-releves/saisie-releves.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RecommendationsComponent } from './recommendations/recommendations.component';
import { SitesBatimentsComponent } from './sites-batiments/sites-batiments.component';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'saisie-releves', component: SaisieRelevesComponent },
  { path: 'recommendations', component: RecommendationsComponent },
  { path: 'sites-batiments', component: SitesBatimentsComponent },
  { path: '**', redirectTo: '/dashboard' },
];
