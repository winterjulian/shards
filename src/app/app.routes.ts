import { Routes } from '@angular/router';
import { OverviewComponent } from './components/overview/overview.component';
import {FileManagementPageComponent} from './pages/file-management-page/file-management-page.component';
import {DirectorySelectionPageComponent} from './pages/directory-selection-page/directory-selection-page.component';
import {ShardsManagementPageComponent} from './pages/shards-management-page/shards-management-page.component';

export const routeConfig: Routes = [
  { path: '', redirectTo: '/directorySelection', pathMatch: 'full' },
  { path: 'directorySelection', component: DirectorySelectionPageComponent },
  { path: 'fileManagement', component: FileManagementPageComponent },
  { path: 'shardsManagement', component: ShardsManagementPageComponent },
  { path: '*', redirectTo: '/directorySelection', pathMatch: 'full' },
];
