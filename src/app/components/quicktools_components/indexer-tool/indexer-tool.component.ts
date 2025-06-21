import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StoreService } from '../../../services/store.service';
import { WorkflowService } from '../../../services/workflow.service';
import { ExtendedFile } from '../../../interfaces/extendedFile';
import {NgIf} from '@angular/common';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-indexer-tool',
  imports: [FormsModule, NgIf, MatButton],
  templateUrl: './indexer-tool.component.html',
  standalone: true,
  styleUrls: ['./indexer-tool.component.css']
})
export class IndexerToolComponent {
  alternativeName: string = ''
  placeholderForNumber: number = 0;
  startingFrom: number = 0;
  spacerText: string = '';
  positionToggle: boolean = false;
  opened: boolean = false;

  backupFileNames: string[] = [];

  constructor(
    public store: StoreService,
    private workflowService: WorkflowService
  ) {}

  public toggleExpansion() {
    if (this.store.selectionCounterSignal() === 0 || this.workflowService.isProcessing()) {
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

  indexingString() {
    const placeholderLength = this.placeholderForNumber || 0;
    let counter = this.startingFrom;

    this.store.filesSignal().forEach((file: ExtendedFile) => {
      if (file.isSelected) {
        let indexString = (counter++).toString().padStart(placeholderLength, '0');
        let fileName = file.name;

        if (this.alternativeName) {
          fileName = this.alternativeName;
        }

        if (!this.positionToggle) {
          fileName = indexString + this.spacerText + fileName;
        } else {
          fileName = fileName + this.spacerText + indexString;
        }

        file.displayName = fileName;
      }
    });
  }

  acceptChanges() {
    this.opened = false;
    this.workflowService.setIsProcessing(false);

    this.backupFileNames = [];
    this.store.filesSignal().forEach((file: ExtendedFile) => {
      if (file.isSelected) {
        file.changedName = file.displayName;
        file.changed = true;
      }
    })
  }

  cancelChanges() {

    let counter = 0;

    this.store.filesSignal().forEach((file: ExtendedFile) => {
      if (file.isSelected) {
        console.log(this.backupFileNames[counter])
        file.displayName = this.backupFileNames[counter];
        counter += 1;
      }
    })

    this.setBackComponent()
  }

  setBackComponent(): void {
    this.workflowService.setIsProcessing(false);
    this.opened = false;
    this.backupFileNames = [];
  }
}



