import {Component, inject, OnInit} from '@angular/core';
import {FileManagerComponent} from '../../components/file-manager/file-manager.component';
import {QuicktoolsComponent} from '../../components/quicktools/quicktools.component';
import {WorkflowService} from '../../services/workflow.service';
import {FileGroupListComponent} from '../../components/file-group-list/file-group-list.component';
import {FileListComponent} from '../../components/file-list/file-list.component';
import {FileListFooterComponent} from '../../components/file-list-footer/file-list-footer.component';
import {FileListHeaderComponent} from '../../components/file-list-header/file-list-header.component';
import {FileListWrapperComponent} from '../../components/file-list-wrapper/file-list-wrapper.component';
import {FileSelectorComponent} from '../../components/file-selector/file-selector.component';
import {NgIf} from '@angular/common';
import {PercentageVerticalComponent} from '../../components/percentage-vertical/percentage-vertical.component';
import {StoreService} from '../../services/store.service';
import {DirectoryFooterComponent} from '../../components/directory-footer/directory-footer.component';

@Component({
  selector: 'app-directory-selection-page',
  imports: [
    FileSelectorComponent,
    DirectoryFooterComponent,
  ],
  standalone: true,
  templateUrl: './directory-selection-page.component.html',
  styleUrl: './directory-selection-page.component.scss'
})
export class DirectorySelectionPageComponent implements OnInit {
  public store = inject(StoreService);

  ngOnInit() {
    console.log('DirectorySelectionPageComponent loaded');
  }
}

