import {Component, signal} from '@angular/core';
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
  public isAcceptDisabled = signal<boolean>(true);

  alternativeName: string = ''
  placeholderForNumber: number = 1;
  startingFrom: number | undefined = undefined;
  spacerText: string = '';
  positionToggle: boolean = true;

  constructor(
    public store: StoreService,
  ) {}

  indexingString() {
    if (!this.startingFrom) {
      return
    }

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

    this.isAcceptDisabled.set(false);
  }

  onAccept() {
    this.resetComponent();
  }

  onCancel() {
    this.resetComponent()
  }

  resetComponent(): void {
    this.alternativeName = ''
    this.placeholderForNumber = 1;
    this.startingFrom = undefined;
    this.spacerText = '';
    this.positionToggle = true;
  }
}



