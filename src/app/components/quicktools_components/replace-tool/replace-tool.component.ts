import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreService } from '../../../services/store.service';
import { ExtendedFile } from '../../../interfaces/extendedFile';
import {WorkflowService} from '../../../services/workflow.service';

@Component({
  selector: 'app-replace-tool',
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './replace-tool.component.html',
  standalone: true,
  styleUrl: './replace-tool.component.css'
})
export class ReplaceToolComponent {
  pattern: string = '';
  replacement: string = '';
  opened: boolean = false;
  backupFileNames: string[] = [];
  replacementBackupFileNames: string[] = [];

  constructor(
    public store: StoreService,
    public workflowService: WorkflowService
  ) {}

  onAccept() {
    this.setBackComponent()
  }

  onCancel() {
    let counter = 0;

    // this.store.filesSignal().forEach((file: ExtendedFile) => {
    //   if (file.isSelected) {
    //     file.changedName; file.displayName = this.backupFileNames[counter];
    //     counter += 1;
    //   }
    // });

    this.setBackComponent()
  }

  onExpand() {
    // TODO: Create store own method
    this.store.filesSignal().forEach((file: ExtendedFile) => {
      if (file.isSelected) {
        this.backupFileNames.push(file.changedName);
      }
    })
  }

  highlightString() {
    if (!this.pattern) {
      return
    }

    this.store.filesSignal().forEach((file: ExtendedFile) => {
      if (file.isSelected) {
        const escapedSearchString = this.pattern.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
        const regex = new RegExp(escapedSearchString, 'gi');
        file.displayName = file.changedName.replace(regex, '<span class="highlight">$&</span>');
      } else {
        file.displayName = file.changedName;
      }
    });
  }

  // generatePreview() {
  //   let counter = 0;
  //
  //   this.store.filesSignal().forEach((file: ExtendedFile) => {
  //     if (file.isSelected && this.pattern && this.replacement) {
  //       this.replacementBackupFileNames[counter] = file.changedName;
  //
  //       const escapedSearchString = this.pattern.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
  //       const regex = new RegExp(escapedSearchString, 'gi');
  //       file.changedName; file.displayName = file.changedName.replace(regex, this.replacement);
  //     }
  //     counter += 1;
  //   });
  // }

  // undoChanges() {
  //   let counter = 0;
  //
  //   this.store.filesSignal().forEach((file: ExtendedFile) => {
  //     if (file.isSelected) {
  //       file.changedName; file.displayName = this.replacementBackupFileNames[counter];
  //     }
  //     counter += 1;
  //   });
  // }

  setBackComponent(): void {
    this.opened = false;
    this.backupFileNames = [];
    this.replacementBackupFileNames = [];
    this.pattern = '';
    this.replacement = '';
  }

  changeString() {
    const pattern = this.pattern;
    const replacement = this.replacement;

    const escapedPattern = pattern.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    const regex = new RegExp(escapedPattern, 'gi');

    this.store.filesSignal().forEach((file: ExtendedFile) => {
      if (file.isSelected) {
        const replaced = file.changedName.replace(regex, replacement);
        file.displayName = replaced.replace(
          new RegExp(escapedPattern, 'gi'),
          '<span class="highlight">$&</span>'
        );
      } else {
        file.displayName = file.changedName;
      }
    });
  }
}
