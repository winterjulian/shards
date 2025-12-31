import {Component, effect, ElementRef, inject, OnInit, ViewChild} from '@angular/core';
import {FileManagerComponent} from '../../components/file-manager/file-manager.component';
import {StoreService} from '../../services/store.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-file-management-page',
  imports: [FileManagerComponent],
  standalone: true,
  templateUrl: './file-management-page.component.html',
  styleUrl: './file-management-page.component.scss'
})
export class FileManagementPageComponent implements OnInit {
  // @ViewChild('renamingOverlay') overlay: ElementRef | undefined;

  public store = inject(StoreService);
  public router = inject(Router);

  constructor() {
    effect(() => {
      const isRenaming = this.store.isRenaming();
      // const overlay = document.querySelector('.renaming-blocked-area');
      //
      // if (isRenaming) {
      //   overlay?.classList.remove('hidden');
      // } else {
      //   overlay?.classList.add('hidden');
      // }
    });
  }

  ngOnInit() {
    if (!this.store.currentDirectory()) {
      this.router.navigate(['directorySelection']).then();
    }
  }
}
