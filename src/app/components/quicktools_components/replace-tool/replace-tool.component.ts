import { Component, signal, computed } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreService } from '../../../services/store.service';
import { ExtendedFile } from '../../../interfaces/extendedFile';

@Component({
  selector: 'app-replace-tool',
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './replace-tool.component.html',
  standalone: true,
  styleUrl: './replace-tool.component.css',
})
export class ReplaceToolComponent {
  pattern = signal('');
  replacement = signal('');
  isAcceptDisabled = computed(() => {
    return this.pattern().trim() === '';
  });

  opened = false;
  backupFileNames: string[] = [];
  replacementBackupFileNames: string[] = [];

  constructor(public store: StoreService) {}

  // INTERACTORS

  onAccept() {
    if (this.pattern().trim() === '') {
      return;
    }

    this.changePattern()
    this.resetComponent();
  }

  onCancel() {
    this.resetHighlighting();
    this.resetComponent();
  }

  // OTHERS

  highlightString() {
    const pattern = this.pattern();
    if (!pattern) return;

    const escapedSearchString = pattern.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    const regex = new RegExp(escapedSearchString, 'gi');

    this.store.filesSignal().forEach((file: ExtendedFile) => {
      if (file.isSelected) {
        file.displayName = file.changedName.replace(regex, '<span class="highlight-text">$&</span>');
      } else {
        file.displayName = file.changedName;
      }
    });
  }

  changePattern() {
    const pattern = this.pattern();
    const replacement = this.replacement();

    const escapedPattern = pattern.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    const regex = new RegExp(escapedPattern, 'gi');

    this.store.filesSignal().forEach((file: ExtendedFile) => {
      if (file.isSelected) {
        const replaced = file.changedName.replace(regex, replacement);
        file.displayName = replaced.replace(
          new RegExp(escapedPattern, 'gi'),
          '<span class="highlight-text">$&</span>'
        );
      } else {
        file.displayName = file.changedName;
      }
    });
  }

  resetHighlighting() {
    this.store.filesSignal().forEach((file: ExtendedFile) => {
      file.displayName = file.changedName;
    });
  }

  resetComponent(): void {
    this.opened = false;
    this.backupFileNames = [];
    this.replacementBackupFileNames = [];
    this.pattern.set('');
    this.replacement.set('');
  }
}
