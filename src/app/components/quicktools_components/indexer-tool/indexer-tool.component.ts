import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StoreService } from '../../../services/store.service';
import { WorkflowService } from '../../../services/workflow.service';
import { ExtendedFile } from '../../../interfaces/extendedFile';

@Component({
  selector: 'app-indexer-tool',
  imports: [FormsModule],
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
  ) {}

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

  onAccept() {
    this.opened = false;

    this.backupFileNames = [];
    this.store.filesSignal().forEach((file: ExtendedFile) => {
      if (file.isSelected) {
        file.changedName = file.displayName;
        file.changed = true;
      }
    })
  }

  onCancel() {

    let counter = 0;

    // this.store.filesSignal().forEach((file: ExtendedFile) => {
    //   if (file.isSelected) {
    //     console.log(this.backupFileNames[counter])
    //     file.displayName = this.backupFileNames[counter];
    //     counter += 1;
    //   }
    // })

    this.setBackComponent()
  }

  setBackComponent(): void {
    this.opened = false;
    this.backupFileNames = [];
  }
}



