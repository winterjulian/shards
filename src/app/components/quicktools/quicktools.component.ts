import { Component, EventEmitter, Output } from '@angular/core';
import { NgClass } from '@angular/common';
import { ReplaceToolComponent } from '../quicktools_components/replace-tool/replace-tool.component';
import { StoreService } from '../../services/store.service';
import { IndexerToolComponent } from '../quicktools_components/indexer-tool/indexer-tool.component';
import { WorkflowService } from '../../services/workflow.service';
import { QuicktoolWrapperComponent } from '../quicktool-wrapper/quicktool-wrapper.component';
import { CaseConverterToolComponent } from '../quicktools_components/case-converter-tool/case-converter-tool.component';

@Component({
  selector: 'app-quicktools',
  imports: [
    NgClass,
    ReplaceToolComponent,
    IndexerToolComponent,
    QuicktoolWrapperComponent,
    CaseConverterToolComponent,
  ],
  templateUrl: './quicktools.component.html',
  standalone: true,
  styleUrl: './quicktools.component.css',
})
export class QuicktoolsComponent {
  @Output() onVerticalPositionChange = new EventEmitter();

  // readonly dialog = inject(MatDialog);
  activeTool: { name: string; cancelFn: () => void } | null = null;
  verticalPosition: boolean = false;

  constructor(
    public store: StoreService,
    public workflowService: WorkflowService
  ) {}

  undoChanges() {
    this.store.undo();
  }

  redoChanges() {
    this.store.redo();
  }

  onExpand(isExpanded: boolean, name: string, cancelFn: () => void) {
    if (this.activeTool && (this.activeTool.name !== name || !isExpanded)) {
      this.activeTool.cancelFn();
    }

    this.activeTool = { name, cancelFn };

    if (isExpanded) {
      this.workflowService.setIsProcessing(true);
      this.store.addIntermediateSnapshot();
    } else {
      this.workflowService.setIsProcessing(false);
    }
  }

  onAccept() {
    this.workflowService.setIsProcessing(false);
    this.store.transferDisplayToChangedName();
    this.store.addSnapshotToHistory();
    this.store.clearIntermediateSnapshot();
  }

  onCancel() {
    console.log('onCancel()')
    this.workflowService.setIsProcessing(false);
    this.store.resetFileNamesFromIntermediateSnapshot();
    this.store.clearIntermediateSnapshot();
  }
}
