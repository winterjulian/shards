import {Component, inject} from '@angular/core';
import {StoreService} from '../../services/store.service';
import {DialogService} from '../../services/dialog.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-directory-footer',
  imports: [],
  standalone: true,
  templateUrl: './directory-footer.component.html',
  styleUrl: './directory-footer.component.scss'
})
export class DirectoryFooterComponent {
  public store = inject(StoreService);
  public dialogService = inject(DialogService);
  public router = inject(Router);

  returnToFileManagement() {
    this.router.navigate(['fileManagement']).then();
  }

  startRenamingProcess(): void {
    this.openRenamingDialogue();
  }

  openRenamingDialogue(): void {
    this.dialogService.openWithMessage(
      'Rename files',
      'Do you want to rename all changed files?',
      {
        accept: () => {
          this.store.newRenameFiles();
        }
      }
    )
  }
}
