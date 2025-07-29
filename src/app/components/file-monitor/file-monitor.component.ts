import { Component } from '@angular/core';
import { StoreService } from '../../services/store.service';

@Component({
  selector: 'app-file-monitor',
  imports: [],
  templateUrl: './file-monitor.component.html',
  standalone: true,
  styleUrl: './file-monitor.component.css',
})
export class FileMonitorComponent {
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
}
