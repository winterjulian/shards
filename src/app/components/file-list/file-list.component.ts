import {Component, HostListener} from '@angular/core';
import {StoreService} from '../../services/store.service';
import {ExtendedFile} from '../../interfaces/extendedFile';
import {CdkDrag, CdkDragHandle, CdkDragPlaceholder, CdkDropList, moveItemInArray} from '@angular/cdk/drag-drop';
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

  onMouseDown(file: ExtendedFile) {
    this.store.selectFile(file);
    this.isMouseDown = true;
  }

  onMouseEnterFile(file: ExtendedFile) {
    if (this.isMouseDown) {
      this.store.selectFile(file);
    }
  }
}
