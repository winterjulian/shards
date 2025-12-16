import {Component, inject} from '@angular/core';
import {StoreService} from '../../services/store.service';
import {WorkflowService} from '../../services/workflow.service';

@Component({
  selector: 'app-file-list-footer',
  imports: [],
  standalone: true,
  templateUrl: './file-list-footer.component.html',
  styleUrl: './file-list-footer.component.scss'
})
export class FileListFooterComponent {
  public store = inject(StoreService);
  public workflowService = inject(WorkflowService);

  openQuicktools(): void {
    this.workflowService.isProcessing.set(true);
  }

  changeSource() {
    this.store.removeAllFiles();
  }

  arrangeFiles() {
    this.store.rearrangeFiles();
  }

  openShards(): void {
    // TODO: Implement shards
  }
}
