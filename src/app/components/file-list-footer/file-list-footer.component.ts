import {Component, inject} from '@angular/core';
import {StoreService} from '../../services/store.service';
import {WorkflowService} from '../../services/workflow.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-file-list-footer',
  imports: [],
  standalone: true,
  templateUrl: './file-list-footer.component.html',
  styleUrl: './file-list-footer.component.scss'
})
export class FileListFooterComponent {
  // readonly dialog = inject(MatDialog);
  public store = inject(StoreService);
  public workflowService = inject(WorkflowService);
  public router = inject(Router);

  changeSource() {
    this.store.removeAllFiles();
  }

  startRenamingProcess(): void {
    this.openDialogue();
    console.log('I\'ve been clicked')
  }

  openDialogue(): void {
    // console.log(this.store.getChangedFilesAsNumber());
    // const dialogRef = this.dialog.open(DialogRenameComponent, {
    //   data: { changedFiles: this.store.getChangedFilesAsNumber() },
    // });
    //
    // dialogRef.afterClosed().subscribe(result => {
    //   if (result) {
    //     this.store.renameFiles();
    //   }
    // });
  }
}
