import {Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {StoreService} from '../../services/store.service';

@Component({
  selector: 'app-pathfinder',
  imports: [
    FormsModule
  ],
  templateUrl: './pathfinder.component.html',
  standalone: true,
  styleUrl: './pathfinder.component.css'
})
export class PathfinderComponent {

  constructor(private store: StoreService) {}

  getFiles() {
    this.store.getFilesByDialogue()
  }
}
