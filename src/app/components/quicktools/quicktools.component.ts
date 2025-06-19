import {Component, EventEmitter, Output} from '@angular/core';
import {NgClass} from '@angular/common';
import {ReplaceToolComponent} from '../quicktools_components/replace-tool/replace-tool.component';
import {StoreService} from '../../services/store.service';
import {IndexerToolComponent} from '../quicktools_components/indexer-tool/indexer-tool.component';
import {MatSlideToggle} from "@angular/material/slide-toggle";
import {WorkflowService} from '../../services/workflow.service';

@Component({
  selector: 'app-quicktools',
    imports: [
        NgClass,
        ReplaceToolComponent,
        IndexerToolComponent
    ],
  templateUrl: './quicktools.component.html',
  standalone: true,
  styleUrl: './quicktools.component.css'
})
export class QuicktoolsComponent {
  @Output() onVerticalPositionChange = new EventEmitter();

  verticalPosition: boolean = false;

  constructor(public store: StoreService, public workflowService: WorkflowService) {}

  changeDirection() {
    this.verticalPosition = !this.verticalPosition;
    this.onVerticalPositionChange.emit(this.verticalPosition);
  }
}
