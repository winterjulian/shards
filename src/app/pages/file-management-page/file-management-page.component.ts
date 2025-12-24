import {Component, inject, OnInit} from '@angular/core';
import {FileManagerComponent} from '../../components/file-manager/file-manager.component';
import {QuicktoolsComponent} from '../../components/quicktools/quicktools.component';
import {WorkflowService} from '../../services/workflow.service';

@Component({
  selector: 'app-file-management-page',
  imports: [
    FileManagerComponent,
    QuicktoolsComponent
  ],
  standalone: true,
  templateUrl: './file-management-page.component.html',
  styleUrl: './file-management-page.component.scss'
})
export class FileManagementPageComponent implements OnInit {
  public workflowService = inject(WorkflowService);

  ngOnInit() {
    console.log('FileManagementPageComponent loaded');
  }
}
