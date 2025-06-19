import {Component, Input} from '@angular/core';
import {StoreService} from '../../services/store.service';
import {NgClass, NgForOf, NgStyle} from '@angular/common';
import {ExtendedFile} from '../../interfaces/extendedFile';

@Component({
  selector: 'app-percentage-display',
  imports: [
    NgForOf,
    NgClass
  ],
  templateUrl: './percentage-display.component.html',
  standalone: true,
  styleUrl: './percentage-display.component.css'
})
export class PercentageDisplayComponent {
  @Input() property: 'isSelected' | 'isVisible' = 'isSelected';
  @Input() color: 1 | 2 | 3 | 4 = 1;

  constructor(
    public store: StoreService
  ) {}

  // public selectFile(file: ExtendedFile): void {
  //   this.store.selectFile(file)
  // }
}
