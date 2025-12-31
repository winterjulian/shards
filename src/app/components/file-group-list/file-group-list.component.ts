import {Component, HostListener} from '@angular/core';
import {StoreService} from '../../services/store.service';
import {CdkDrag, CdkDragDrop, CdkDragHandle, CdkDragPlaceholder, CdkDropList} from '@angular/cdk/drag-drop';
import {NgClass} from '@angular/common';
import {ExtendedFileGroup} from '../../interfaces/extendedFileGroup';

@Component({
  selector: 'app-file-group-list',
  imports: [
    CdkDrag,
    CdkDragHandle,
    CdkDropList,
    NgClass,
    CdkDragPlaceholder,
  ],
  templateUrl: './file-group-list.component.html',
  styleUrl: './file-group-list.component.scss'
})
export class FileGroupListComponent {
  constructor(public store: StoreService) {}
  private selectionMode: 'select' | 'deselect' | null = null;
  public isMouseDown: boolean = false;

  @HostListener('document:mouseup', ['$event'])
  onMouseUp() {
    this.isMouseDown = false;
  }

  onMouseDown(event: MouseEvent, file: ExtendedFileGroup) {
    if (event.shiftKey) {
      return;
    }
    this.selectionMode = file.isSelected ? 'deselect' : 'select';
    this.isMouseDown = true;
    this.applySelectionToFile(file);
  }

  onMouseEnterFile(file: ExtendedFileGroup) {
    if (this.isMouseDown) {
      this.applySelectionToFile(file);
    }
  }

  private applySelectionToFile(fileGroup: ExtendedFileGroup) {
    if (this.selectionMode === 'select' && !fileGroup.isSelected) {
      this.store.setFileGroupIsSelected(fileGroup, true);
    } else if (this.selectionMode === 'deselect' && fileGroup.isSelected) {
      this.store.setFileGroupIsSelected(fileGroup, false);
    }
  }

  dropFile(event: CdkDragDrop<ExtendedFileGroup[]>): void {
    this.store.changeFileGroupIndex(event)
  }

  // onMouseDown(event: any, fileGroup: ExtendedFileGroup) {
  //   console.log('onMouseDown', fileGroup);
  // }
  //
  // onMouseEnterFile(fileGroup: ExtendedFileGroup) {
  //   console.log('onMouseEnter', fileGroup);
  // }

  onFileClick(event: any, fileGroup: ExtendedFileGroup, index: number) {
    console.log('onFileClicks', fileGroup, index);
  }

  groupFiles(index: number): void {
    this.store.groupFiles(index);
  }

  ungroupFiles(index: number): void {
    this.store.ungroupFiles(index);
  }

  testFunc(entry: ExtendedFileGroup) {
    console.log(entry);
  }
}
