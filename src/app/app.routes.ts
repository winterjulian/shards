import { Routes } from '@angular/router';
import {OverviewComponent} from './components/overview/overview.component';

export const routeConfig: Routes = [
  { path: '', redirectTo: '/overview', pathMatch: 'full' },
  { path: 'overview', component: OverviewComponent },
];
