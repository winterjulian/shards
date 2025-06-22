import {Component, inject, signal} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {QuicktoolsComponent} from '../quicktools/quicktools.component';
import {NgClass} from '@angular/common';
import {FileManagerComponent} from '../file-manager/file-manager.component';
import {WorkflowService} from '../../services/workflow.service';

@Component({
  selector: 'app-overview',
  imports: [
    FormsModule,
    QuicktoolsComponent,
    NgClass,
    FileManagerComponent
  ],
  templateUrl: './overview.component.html',
  standalone: true,
  styleUrl: './overview.component.css'
})
export class OverviewComponent {
  public workflowService = inject(WorkflowService);
  verticalPosition = signal<boolean>(false);
}
