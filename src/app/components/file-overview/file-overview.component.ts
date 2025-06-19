import {Component, effect, signal} from '@angular/core';
import {ExtendedFile} from '../../interfaces/extendedFile';
import {NgForOf, NgIf} from '@angular/common';
import {StoreService} from '../../services/store.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PercentageDisplayComponent} from '../percentage-display/percentage-display.component';
import {Event} from '@angular/router';
import {FileSelectorComponent} from '../file-selector/file-selector.component';

@Component({
  selector: 'app-file-overview',
  imports: [
    NgForOf,
    ReactiveFormsModule,
    FormsModule,
    PercentageDisplayComponent,
    FileSelectorComponent
  ],
  templateUrl: './file-overview.component.html',
  standalone: true,
  styleUrl: './file-overview.component.css'
})
export class FileOverviewComponent {

  private debounceTimeout: any;

  constructor(
    public store: StoreService,
  ) {
    this.initSignalListeners()
  }

  selectFile(file: ExtendedFile) {
    this.store.selectFile(file);
  }

  editFileName(e: any, file: ExtendedFile) {
    e.stopPropagation();
    console.log(file);
  }

  changeCompleteSelection(bool: boolean) {
    this.store.selectOrDeselectAll(bool)
  }

  invertSelection() {
    this.store.invertSelection();
  }

  initSignalListeners() {
    effect(() => {
      console.log('')
      if (this.store.searchStringSignal() == "") {
        this.store.resetVisibility();
      } else {
        if (this.debounceTimeout) {
          clearTimeout(this.debounceTimeout);
        }

        this.debounceTimeout = setTimeout(() => {
          this.store.filterFiles(this.store.searchStringSignal())
        }, 750);
      }

    });
  }
}
