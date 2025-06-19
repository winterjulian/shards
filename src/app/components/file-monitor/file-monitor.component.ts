import {Component, effect} from '@angular/core';
import {PercentageDisplayComponent} from '../percentage-display/percentage-display.component';
import {StoreService} from '../../services/store.service';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-file-monitor',
  imports: [
    PercentageDisplayComponent,
    MatButton,
  ],
  templateUrl: './file-monitor.component.html',
  standalone: true,
  styleUrl: './file-monitor.component.css'
})
export class FileMonitorComponent {
  private debounceTimeout: any;

  constructor( public store: StoreService) {}

  selectAll() {
    this.store.selectAll();
  }

  deselectAll() {
    this.store.deselectAll()
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
