import {Component, effect, EventEmitter, HostListener, Input, Output, signal} from '@angular/core';
import {CdkDragHandle} from '@angular/cdk/drag-drop';
import {NgClass} from '@angular/common';
import {ExtendedFile} from '../../interfaces/extendedFile';
import {StoreService} from '../../services/store.service';
import {FilesizePipe} from '../../pipes/file-size.pipe';
import {DialogService} from '../../services/dialog.service';
import {ShardService} from '../../services/shard.service';
import {ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-file-list-row',
  imports: [
    CdkDragHandle,
    NgClass,
    FilesizePipe,
    ReactiveFormsModule
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

  public isMouseDown: boolean = false;

  @HostListener('document:mouseup', ['$event'])
  onMouseUp() {
    this.isMouseDown = false;
  }

  constructor(
    public store: StoreService,
    public dialogService: DialogService,
    public shardsService: ShardService
  ) {}

  renameFileDirectly(file: ExtendedFile) {
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

  preventCalling(e: any) {
    e.preventDefault(); e.stopPropagation()
  }

  openWarning(warning: string) {
    this.dialogService.openWithMessage(
      'OS renaming error',
      warning,
      {
        accept: () => {}
      },
      true
    )
  }

  testFunc(e: any, file: ExtendedFile){
    e.preventDefault();
    e.stopPropagation();
    console.log(file);
  }
}
