import { Component } from '@angular/core';
import { StoreService } from '../../services/store.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-file-overview',
  imports: [
    ReactiveFormsModule,
    FormsModule,
  ],
  templateUrl: './file-overview.component.html',
  standalone: true,
  styleUrl: './file-overview.component.css',
})
export class FileOverviewComponent {
  private debounceTimeout: any;

  constructor(public store: StoreService) {}

  selectAll() {
    this.store.selectAll();
  }

  deselectAll() {
    this.store.deselectAll();
  }

  invertSelection() {
    this.store.invertSelection();
  }

  clearSearchString() {
    this.store.resetSearch();
  }

  // initSignalListeners() {
  //   effect(() => {
  //     console.log('')
  //     if (this.store.searchStringSignal() == "") {
  //       this.store.resetVisibility();
  //     } else {
  //       if (this.debounceTimeout) {
  //         clearTimeout(this.debounceTimeout);
  //       }
  //
  //       this.debounceTimeout = setTimeout(() => {
  //         this.store.filterFiles(this.store.searchStringSignal())
  //       }, 750);
  //     }
  //
  //   });
  // }

  showAllFiles() {
    this.store.resetVisibility();
  }

  showSelectedFiles() {
    this.store.showSelectedFiles();
  }
}
