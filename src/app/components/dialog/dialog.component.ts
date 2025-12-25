import {Component, inject} from '@angular/core';
import {DialogService} from '../../services/dialog.service';
import {NgComponentOutlet} from '@angular/common';

@Component({
  selector: 'app-dialog',
  imports: [
    NgComponentOutlet
  ],
  standalone: true,
  templateUrl: './dialog.component.html',
})
export class DialogComponent {
  protected popupService = inject(DialogService);
}
