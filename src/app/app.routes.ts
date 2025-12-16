import { Routes } from '@angular/router';
import { FileManagementPageComponent } from './pages/file-management-page/file-management-page.component';
import { DirectorySelectionPageComponent } from './pages/directory-selection-page/directory-selection-page.component';
import { ShardsManagementPageComponent } from './pages/shards-management-page/shards-management-page.component';

export const routeConfig: Routes = [
  {
    path: 'directorySelection',
    component: DirectorySelectionPageComponent
  },
  {
    path: 'fileManagement',
    component: FileManagementPageComponent
  },
  {
    path: 'shardsManagement',
    component: ShardsManagementPageComponent
  },
  {
    path: '**',
    redirectTo: '/directorySelection'
  }
];
