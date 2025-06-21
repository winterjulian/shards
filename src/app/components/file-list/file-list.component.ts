import {Component, HostListener} from '@angular/core';
import {StoreService} from '../../services/store.service';
import {ExtendedFile} from '../../interfaces/extendedFile';
import {
  CdkDrag,
  CdkDragDrop,
  CdkDragHandle,
  CdkDragPlaceholder,
  CdkDropList,
  moveItemInArray
} from '@angular/cdk/drag-drop';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-file-list',
  imports: [
    CdkDropList,
    CdkDrag,
    CdkDragHandle,
    CdkDragPlaceholder,
    NgClass
  ],
  templateUrl: './file-list.component.html',
  standalone: true,
  styleUrl: './file-list.component.scss'
})
export class FileListComponent {
  private selectionMode: 'select' | 'deselect' | null = null;
  public isMouseDown: boolean = false;

  @HostListener('document:mouseup', ['$event'])
  onMouseUp() {
    this.isMouseDown = false;
  }

  constructor(public store: StoreService) {}

  editFileName(e: any, file: ExtendedFile) {
    e.stopPropagation();
    console.log(file);
  }

  onMouseDown(event: MouseEvent, file: ExtendedFile) {
    if (event.shiftKey) {
      return;
    }
    this.selectionMode = file.isSelected ? 'deselect' : 'select';
    this.isMouseDown = true;
    this.applySelectionToFile(file);
  }

  onMouseEnterFile(file: ExtendedFile) {
    if (this.isMouseDown) {
      this.applySelectionToFile(file);
    }
  }

  private applySelectionToFile(file: ExtendedFile) {
    if (this.selectionMode === 'select' && !file.isSelected) {
      this.store.setFileIsSelected(file, true);
    } else if (this.selectionMode === 'deselect' && file.isSelected) {
      this.store.setFileIsSelected(file, false);
    }
  }

  dropFile(event: CdkDragDrop<ExtendedFile[]>) {
    this.store.changeFileIndex(event)
  }

  onFileClick(event: MouseEvent, file: ExtendedFile, index: number) {
    const lastSelected = this.store.lastSelectedFile();
    if (event.shiftKey && lastSelected) {
      this.store.setFilesByIndices(file.index - (file.index-index), lastSelected.index, !file.isSelected);
    } else {
      this.store.lastSelectedFile.set(file);
    }
  }
}
