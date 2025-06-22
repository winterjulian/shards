import {Component, effect, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FileSelectorComponent} from '../file-selector/file-selector.component';
import {FileListComponent} from '../file-list/file-list.component';
import {FileMonitorComponent} from '../file-monitor/file-monitor.component';
import {NgIf} from '@angular/common';
import {StoreService} from '../../services/store.service';
import {WorkflowService} from '../../services/workflow.service';
import {PercentageVerticalComponent} from '../percentage-vertical/percentage-vertical.component';

@Component({
  selector: 'app-file-manager',
  imports: [
    ReactiveFormsModule,
    FormsModule,
    FileSelectorComponent,
    FileListComponent,
    FileMonitorComponent,
    NgIf,
    PercentageVerticalComponent,
    FileMonitorComponent
  ],
  templateUrl: './file-manager.component.html',
  standalone: true,
  styleUrl: './file-manager.component.scss'
})
export class FileManagerComponent {
  @ViewChild('overlay') overlay: ElementRef | undefined;

  constructor(
    public store: StoreService,
    private workflowService: WorkflowService
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
