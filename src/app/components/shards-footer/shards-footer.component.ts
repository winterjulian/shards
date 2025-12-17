import {Component, inject} from '@angular/core';
import {WorkflowService} from '../../services/workflow.service';

@Component({
  selector: 'app-shards-footer',
  imports: [],
  standalone: true,
  templateUrl: './shards-footer.component.html',
  styleUrl: './shards-footer.component.scss'
})
export class ShardsFooterComponent {
  private workflowService = inject(WorkflowService);

  returnToSelection(): void {
    this.workflowService.isInShardMode.set(false);
  }
}
