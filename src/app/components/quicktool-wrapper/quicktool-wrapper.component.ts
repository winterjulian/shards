import {Component, ContentChild, EventEmitter, inject, input, Input, output, Output} from '@angular/core';
import {NgIf} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {MatButton} from '@angular/material/button';
import {WorkflowService} from '../../services/workflow.service';

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
  title = input.required<string>();
  icon = input<string>('sync');
  accept = output<void>();
  cancel = output<void>();
  expand = output<boolean>();

  isExpanded = false;

  toggle(): void {
    this.expand.emit(this.isExpanded);
    this.isExpanded = !this.isExpanded;
  }

  cancelChanges(): void {
    this.isExpanded = false;
    this.cancel.emit();
  }

  acceptChanges(): void {
    this.accept.emit();
  }
}
