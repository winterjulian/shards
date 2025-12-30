import {Component, effect, ElementRef, ViewChild } from '@angular/core';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';
import {FileSelectorComponent } from '../file-selector/file-selector.component';
import {FileListComponent } from '../file-list/file-list.component';
import {NgIf} from '@angular/common';
import {StoreService } from '../../services/store.service';
import {PercentageVerticalComponent } from '../percentage-vertical/percentage-vertical.component';
import {FileListWrapperComponent} from '../file-list-wrapper/file-list-wrapper.component';
import {FileGroupListComponent} from '../file-group-list/file-group-list.component';
import {FileListHeaderComponent} from '../file-list-header/file-list-header.component';
import {FileListFooterComponent} from '../file-list-footer/file-list-footer.component';
import {QuicktoolsComponent} from '../quicktools/quicktools.component';

@Component({
  selector: 'app-file-manager',
  imports: [
    ReactiveFormsModule,
    FormsModule,
    FileSelectorComponent,
    FileListComponent,
    NgIf,
    PercentageVerticalComponent,
    FileListWrapperComponent,
    FileGroupListComponent,
    FileListHeaderComponent,
    FileListFooterComponent,
    QuicktoolsComponent,
  ],
  templateUrl: './file-manager.component.html',
  standalone: true,
  styleUrl: './file-manager.component.scss',
})
export class FileManagerComponent {
  @ViewChild('overlay') overlay: ElementRef | undefined;

  constructor(public store: StoreService,) {
    effect(() => {
      const isProcessing = this.store.isRenaming();
      const overlay = document.querySelector('.blocked-area');

      if (isProcessing) {
        overlay?.classList.remove('hidden');
      } else {
        overlay?.classList.add('hidden');
      }
    });
  }
}
