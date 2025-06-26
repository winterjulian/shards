import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatRadioGroup, MatRadioButton } from '@angular/material/radio';
import { StoreService } from '../../../services/store.service';

@Component({
  selector: 'app-case-converter-tool',
  standalone: true,
  imports: [MatRadioGroup, MatRadioButton, FormsModule],
  templateUrl: './case-converter-tool.component.html',
  styleUrl: './case-converter-tool.component.scss',
})
export class CaseConverterToolComponent {
  public isAcceptDisabled = signal<boolean>(true);
  public selectedCase = 'lower';

  constructor(private store: StoreService) {}

  onSelectionChange(): void {
    this.isAcceptDisabled.set(false);

    this.store.filesSignal().forEach(file => {
      if (file.isSelected) {
        file.displayName = this.applyCase(file.changedName);
      }
    });
  }

  onAccept(): void {
    return;
  }

  onCancel(): void {
    return;
  }

  private applyCase(value: string): string {
    switch (this.selectedCase) {
      case 'upper':
        return value.toUpperCase();
      case 'lower':
        return value.toLowerCase();
      case 'capitalize':
        return value.replace(
          /\b\p{L}+/gu,
          word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        );
      default:
        return value;
    }
  }
}
