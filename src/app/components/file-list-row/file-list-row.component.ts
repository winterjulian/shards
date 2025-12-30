import {Component, EventEmitter, HostListener, Input, Output} from '@angular/core';
import {CdkDragDrop, CdkDragHandle} from '@angular/cdk/drag-drop';
import {NgClass} from '@angular/common';
import {ExtendedFile} from '../../interfaces/extendedFile';
import {StoreService} from '../../services/store.service';

@Component({
  selector: 'app-file-list-row',
  imports: [
    CdkDragHandle,
    NgClass
  ],
  standalone: true,
  templateUrl: './file-list-row.component.html',
  styleUrl: './file-list-row.component.scss'
})
export class FileListRowComponent {
  @Input() file!: ExtendedFile;
  @Input() index!: number;

  @Output() mouseDown = new EventEmitter<MouseEvent>();
  @Output() mouseEnter = new EventEmitter<void>();
  @Output() fileClick = new EventEmitter<MouseEvent>();

  private selectionMode: 'select' | 'deselect' | null = null;
  public isMouseDown: boolean = false;

  @HostListener('document:mouseup', ['$event'])
  onMouseUp() {
    this.isMouseDown = false;
  }

  constructor(public store: StoreService) {}

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

  onFileDrop(event: CdkDragDrop<ExtendedFile[]>) {
    this.store.changeFileIndex(event);
    this.store.addSnapshotToHistory();
  }

  onFileClick(event: MouseEvent, file: ExtendedFile, index: number) {
    // TODO: Check if deprecated or partly deprecated
    const lastSelected = this.store.lastSelectedFile();
    if (event.shiftKey && lastSelected) {
      console.log('HERE');
      this.store.setFilesByIndices(
        file.index - (file.index - index),
        lastSelected.index,
        !file.isSelected
      );
    } else {
      this.store.lastSelectedFile.set(file);
    }
  }

  printFileInformation(file: ExtendedFile) {
    // TODO: Is debugging, remove
    console.log(file)
  }

  onNewMouseDown(e: any) {
    this.mouseDown.emit(e);
  }

  onNewMouseEnter() {
    this.mouseEnter.emit();
  }

  onNewFileClick(e: any) {
    this.fileClick.emit(e)
  }
}
