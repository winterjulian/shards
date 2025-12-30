import {Component, effect, ElementRef, inject, ViewChild} from '@angular/core';
import {FileManagerComponent} from '../../components/file-manager/file-manager.component';
import {StoreService} from '../../services/store.service';

@Component({
  selector: 'app-file-management-page',
  imports: [FileManagerComponent],
  standalone: true,
  templateUrl: './file-management-page.component.html',
  styleUrl: './file-management-page.component.scss'
})
export class FileManagementPageComponent {
  // @ViewChild('renamingOverlay') overlay: ElementRef | undefined;

  public store = inject(StoreService);

  constructor() {
    effect(() => {
      const isRenaming = this.store.isRenaming();
      const overlay = document.querySelector('.renaming-blocked-area');

      if (isRenaming) {
        overlay?.classList.remove('hidden');
      } else {
        overlay?.classList.add('hidden');
      }
    });
  }
}
