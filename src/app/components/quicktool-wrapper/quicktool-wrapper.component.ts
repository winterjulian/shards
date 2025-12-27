import { Component, input, output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-quicktool-wrapper',
  standalone: true,
  templateUrl: './quicktool-wrapper.component.html',
  imports: [ReactiveFormsModule],
  styleUrl: './quicktool-wrapper.component.css',
})
export class QuicktoolWrapperComponent {
  title = input.required<string>();
  icon = input<string>('sync');
  isAcceptDisabled = input<boolean>(false);
  isCancelDisabled = input<boolean>(false);
  stopClosingAfterAccept = input<boolean>(false);

  readonly isButtonClick = true;

  accept = output<void>();
  cancel = output<boolean>();
  expand = output<boolean>();

  isExpanded = false;

  toggle(): void {
    this.isExpanded = !this.isExpanded;
    this.expand.emit(this.isExpanded);
  }

  cancelChanges(): void {
    this.isExpanded = false;
    this.cancel.emit(this.isButtonClick);
  }

  acceptChanges(): void {
    if (!this.stopClosingAfterAccept()) {
      this.isExpanded = false;
    }
    this.accept.emit();
  }
}
