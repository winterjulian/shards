import {Component, input} from '@angular/core';
import {StoreService} from '../../services/store.service';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-file-list-header',
  imports: [
    NgClass
  ],
  standalone: true,
  templateUrl: './file-list-header.component.html',
  styleUrl: './file-list-header.component.scss'
})
export class FileListHeaderComponent {
  isRearranging = input<boolean>(false);
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
