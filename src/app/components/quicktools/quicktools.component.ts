import {Component, EventEmitter, inject, Output, viewChild} from '@angular/core';
import {NgClass} from '@angular/common';
import {ReplaceToolComponent} from '../quicktools_components/replace-tool/replace-tool.component';
import {StoreService} from '../../services/store.service';
import {IndexerToolComponent} from '../quicktools_components/indexer-tool/indexer-tool.component';
import {MatSlideToggle} from "@angular/material/slide-toggle";
import {WorkflowService} from '../../services/workflow.service';
import {MatButton} from '@angular/material/button';
import {QuicktoolWrapperComponent} from '../quicktool-wrapper/quicktool-wrapper.component';

@Component({
  selector: 'app-quicktools',
  imports: [
    NgClass,
    ReplaceToolComponent,
    IndexerToolComponent,
    MatButton,
    QuicktoolWrapperComponent,
  ],
  templateUrl: './quicktools.component.html',
  standalone: true,
  styleUrl: './quicktools.component.css'
})
export class QuicktoolsComponent {
  @Output() onVerticalPositionChange = new EventEmitter();
  replaceTool = viewChild<ReplaceToolComponent>('replaceTool');

  verticalPosition: boolean = false;

  constructor(public store: StoreService) {}

  changeDirection() {
    this.verticalPosition = !this.verticalPosition;
    this.onVerticalPositionChange.emit(this.verticalPosition);
  }

  rename() {
    const changedFiles = this.store.filesSignal()
      .filter(file => file.changed);

    console.log(changedFiles);

    // window.electron.renameFiles(changedFiles).then(result => {
    //   if (result.success) {
    //     console.log('Alle Dateien wurden erfolgreich umbenannt.');
    //   } else {
    //     console.error('Fehler beim Umbenennen:', result.errors);
    //   }
    // });
  }

  apply() {
    console.log('apply');
    this.replaceTool()?.cancelChanges();
  }

  cancel() {
    console.log('cancel');
    this.replaceTool()?.acceptChanges();
  }
}
