import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreService } from '../../../services/store.service';
import { ExtendedFile } from '../../../interfaces/extendedFile';
import { NgIf } from '@angular/common';
import {WorkflowService} from '../../../services/workflow.service';

@Component({
  selector: 'app-replace-tool',
  imports: [ReactiveFormsModule, FormsModule, NgIf],
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

  toggleExpansion() {
    if (this.store.selectionSignal() === 0 || this.workflowService.isProcessing()) {
      return;
    }

    this.opened = true;
    if (this.opened) {
      this.workflowService.setIsProcessing(true);
    }

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

  generatePreview() {
    let counter = 0;

    this.store.filesSignal().forEach((file: ExtendedFile) => {
      if (file.isSelected && this.pattern && this.replacement) {
        this.replacementBackupFileNames[counter] = file.changedName;

        const escapedSearchString = this.pattern.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
        const regex = new RegExp(escapedSearchString, 'gi');
        file.changedName; file.displayName = file.changedName.replace(regex, this.replacement);
      }
      counter += 1;
    });
  }

  undoChanges() {
    console.log('undo');
    let counter = 0;

    this.store.filesSignal().forEach((file: ExtendedFile) => {
      if (file.isSelected) {
        file.changedName; file.displayName = this.replacementBackupFileNames[counter];
      }
      counter += 1;
    });
  }

  acceptChanges() {
    this.setBackComponent()
  }

  cancelChanges() {
    let counter = 0;

    this.store.filesSignal().forEach((file: ExtendedFile) => {
      if (file.isSelected) {
        file.changedName; file.displayName = this.backupFileNames[counter];
        counter += 1;
      }
    });

    this.setBackComponent()
  }

  setBackComponent(): void {
    this.workflowService.setIsProcessing(false);
    this.opened = false;
    this.backupFileNames = [];
    this.replacementBackupFileNames = [];
    this.pattern = '';
    this.replacement = '';
  }
}
