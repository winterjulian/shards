import { Component } from '@angular/core';
import { StoreService } from '../../services/store.service';

@Component({
  selector: 'app-file-selector',
  imports: [],
  templateUrl: './file-selector.component.html',
  standalone: true,
  styleUrl: './file-selector.component.css',
})
export class FileSelectorComponent {
  constructor(public store: StoreService) {}

  getFiles() {
    this.store.getFilesByDialogue();
  }
}
