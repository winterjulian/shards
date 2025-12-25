import {Component, effect, inject} from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import {StoreService} from './services/store.service';
import {WorkflowService} from './services/workflow.service';
import {DialogComponent} from './components/dialog/dialog.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, DialogComponent],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  private router = inject(Router);
  private store = inject(StoreService);
  private workflowService = inject(WorkflowService);
  title = 'Shards';

  constructor() {
    effect(() => {
      const filesExist = this.store.filesSignal().length > 0;
      const inShards = this.workflowService.isInShardMode();

      if (!filesExist && this.router.url !== '/directorySelection') {
        void this.router.navigate(['/directorySelection']);
        return;
      }

      if (filesExist && inShards && this.router.url !== '/shardsManagement') {
        void this.router.navigate(['/shardsManagement']);
        return;
      }

      if (filesExist && !inShards && this.router.url !== '/fileManagement') {
        void this.router.navigate(['/fileManagement']);
      }
    });
  }
}
