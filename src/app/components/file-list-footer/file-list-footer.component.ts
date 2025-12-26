import {Component, inject} from '@angular/core';
import {StoreService} from '../../services/store.service';
import {WorkflowService} from '../../services/workflow.service';
import {Router} from '@angular/router';
import {DialogService} from '../../services/dialog.service';

@Component({
  selector: 'app-file-list-footer',
  imports: [],
  standalone: true,
  templateUrl: './file-list-footer.component.html',
  styleUrl: './file-list-footer.component.scss'
})
export class FileListFooterComponent {
  public store = inject(StoreService);
  public dialogService = inject(DialogService);
  public router = inject(Router);

  changeSource() {
    this.store.removeAllFiles();
  }

  startRenamingProcess(): void {
    console.log(this.store.filesSignal()[0]);
    this.openDialogue();
    console.log('I\'ve been clicked')
  }

  openDialogue(): void {
    this.dialogService.openWithMessage(
      'Rename files',
      'Do you want to rename all changed files?',
      {
        accept: () => {
          console.log('I\'ve been clicked')
        }
      }
    )
  }
}
