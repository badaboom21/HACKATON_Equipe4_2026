import { Routes } from '@angular/router';
import { SaisieRelevesComponent } from './saisie-releves/saisie-releves.component';
import { DashboardComponent } from './dashboard/dashboard.component';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'saisie-releves', component: SaisieRelevesComponent },
  { path: '**', redirectTo: '/dashboard' },
];
