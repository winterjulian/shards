import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogClose, MatDialogRef } from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-dialog-rename',
  imports: [MatButton, MatDialogClose],
  templateUrl: './dialog-rename.component.html',
  styleUrl: './dialog-rename.component.scss',
})
export class DialogRenameComponent {
  readonly dialogRef = inject(MatDialogRef<DialogRenameComponent>);
  readonly data = inject<{ changedFiles: number }>(MAT_DIALOG_DATA);

  closeDialog() {
    this.dialogRef.close();
  }
}
