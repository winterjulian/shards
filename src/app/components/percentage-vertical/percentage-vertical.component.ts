import {Component, inject, Input} from '@angular/core';
import {StoreService} from '../../services/store.service';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-percentage-vertical',
  imports: [
    NgClass
  ],
  templateUrl: './percentage-vertical.component.html',
  standalone: true,
  styleUrl: './percentage-vertical.component.scss'
})
export class PercentageVerticalComponent {
  @Input() property: 'isSelected' | 'isVisible' = 'isSelected';

  public store = inject(StoreService);

}
