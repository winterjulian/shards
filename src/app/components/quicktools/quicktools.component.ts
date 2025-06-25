import {Component, EventEmitter, inject, Output, viewChild} from '@angular/core';
import {NgClass} from '@angular/common';
import {ReplaceToolComponent} from '../quicktools_components/replace-tool/replace-tool.component';
import {StoreService} from '../../services/store.service';
import {IndexerToolComponent} from '../quicktools_components/indexer-tool/indexer-tool.component';
import {WorkflowService} from '../../services/workflow.service';
import {MatButton} from '@angular/material/button';
import {QuicktoolWrapperComponent} from '../quicktool-wrapper/quicktool-wrapper.component';
import {CaseConverterToolComponent} from '../quicktools_components/case-converter-tool/case-converter-tool.component';
import {MatDialog} from '@angular/material/dialog';
import {DialogRenameComponent} from '../dialog-rename/dialog-rename.component';

@Component({
  selector: 'app-quicktools',
  imports: [
    NgClass,
    ReplaceToolComponent,
    IndexerToolComponent,
    MatButton,
    QuicktoolWrapperComponent,
    CaseConverterToolComponent,
  ],
  templateUrl: './quicktools.component.html',
  standalone: true,
  styleUrl: './quicktools.component.css'
})
export class QuicktoolsComponent {
  @Output() onVerticalPositionChange = new EventEmitter();

  readonly dialog = inject(MatDialog);
  activeTool: { name: string, cancelFn: () => void } | null = null;
  verticalPosition: boolean = false;

  constructor(
    public store: StoreService,
    public workflowService: WorkflowService,
  ) {}

  undoChanges() {
    this.store.undo();
  }

  redoChanges() {
    this.store.redo();
  }

  applyChanges() {
    this.openDialog();
  }

  openDialog(): void {
    console.log(this.store.getChangedFilesAsNumber());
    const dialogRef = this.dialog.open(DialogRenameComponent, {
      data: { changedFiles: this.store.getChangedFilesAsNumber() },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.store.renameFiles();
      }
    });
  }

  cancelChanges() {
    this.workflowService.setIsProcessing(false);
  }

  onExpand(name: string, cancelFn: () => void) {
    this.store.addIntermediateSnapshot();

    if (this.activeTool && this.activeTool.name !== name) {
      this.activeTool.cancelFn();
    }
    this.activeTool = { name, cancelFn };
  }

  onAccept() {
    this.store.transferDisplayToChangedName();
    this.store.addSnapshotToHistory();
    this.store.clearIntermediateSnapshot();
  }

  onCancel() {
    this.store.resetFileNamesFromIntermediateSnapshot()
    this.store.clearIntermediateSnapshot();
  }
}
