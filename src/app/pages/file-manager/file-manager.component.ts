import { Component, effect, ElementRef, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FileSelectorComponent } from '../../components/file-selector/file-selector.component';
import { FileListComponent } from '../../components/file-list/file-list.component';
import {NgClass, NgIf} from '@angular/common';
import { StoreService } from '../../services/store.service';
import { WorkflowService } from '../../services/workflow.service';
import { PercentageVerticalComponent } from '../../components/percentage-vertical/percentage-vertical.component';
import {FileListWrapperComponent} from '../../components/file-list-wrapper/file-list-wrapper.component';
import {FileGroupListComponent} from '../../components/file-group-list/file-group-list.component';
import {FileListHeaderComponent} from '../../components/file-list-header/file-list-header.component';
import {FileListFooterComponent} from '../../components/file-list-footer/file-list-footer.component';

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
  ],
  templateUrl: './file-manager.component.html',
  standalone: true,
  styleUrl: './file-manager.component.scss',
})
export class FileManagerComponent {
  @ViewChild('overlay') overlay: ElementRef | undefined;

  constructor(
    public store: StoreService,
    public workflowService: WorkflowService
  ) {
    effect(() => {
      const isProcessing = this.workflowService.isProcessing();
      const overlay = document.querySelector('.blocked-area');

      if (isProcessing) {
        overlay?.classList.remove('hidden');
      } else {
        overlay?.classList.add('hidden');
      }
    });
  }
}
