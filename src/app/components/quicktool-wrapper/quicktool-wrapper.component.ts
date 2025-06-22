import {Component, ContentChild, EventEmitter, Input, Output} from '@angular/core';
import {NgIf} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-quicktool-wrapper',
  standalone: true,
  templateUrl: './quicktool-wrapper.component.html',
  imports: [
    NgIf,
    ReactiveFormsModule,
    MatButton,
  ]
})
export class QuicktoolWrapperComponent {
  @Input() title = 'Tool';
  @Input() icon = 'sync';
  @Output() accept = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  expanded = false;

  toggle() {
    this.expanded = !this.expanded;
  }

  cancelChanges() {
    this.expanded = false;
    this.cancel.emit();
  }

  acceptChanges() {
    this.accept.emit();
  }
}
