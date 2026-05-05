import {
  Component,
  computed, effect,
  EventEmitter,
  HostListener, input,
  Input,
  Output, WritableSignal,
} from '@angular/core';
import {CdkDragHandle} from '@angular/cdk/drag-drop';
import {NgClass} from '@angular/common';
import {ExtendedFile} from '../../interfaces/extendedFile';
import {StoreService} from '../../services/store.service';
import {FilesizePipe} from '../../pipes/file-size.pipe';
import {DialogService} from '../../services/dialog.service';
import {ShardService} from '../../services/shard.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

export interface ShardRow {
  value: WritableSignal<string>;
}

@Component({
  selector: 'app-file-list-row',
  imports: [
    CdkDragHandle,
    NgClass,
    FilesizePipe,
    ReactiveFormsModule,
    FormsModule
  ],
  standalone: true,
  templateUrl: './file-list-row.component.html',
  styleUrl: './file-list-row.component.scss'
})
export class FileListRowComponent {
  @Input() file!: ExtendedFile;
  isSelected = input.required<boolean>();
  @Input() index!: number;

  @Output() mouseDown = new EventEmitter<MouseEvent>();
  @Output() mouseEnter = new EventEmitter<void>();
  @Output() fileClick = new EventEmitter<MouseEvent>();

  public isMouseDown: boolean = false;
  public isExpanded = computed(() =>
    this.shardsService.isShardsActive() && this.isSelected()
  );

  @HostListener('document:mouseup', ['$event'])
  onMouseUp() {
    this.isMouseDown = false;
  }

  protected componentShardColumns: Array<ShardRow> = [];

  constructor(
    public store: StoreService,
    public dialogService: DialogService,
    public shardsService: ShardService
  ) {
    effect(() => {
      const serviceShardColumns = this.shardsService.shardColumns(); // ShardColumn[]

      this.componentShardColumns = serviceShardColumns.map((shardCol) => {
        const value = shardCol.content;
        return { value };
      });
    });
  }

  // renameFileDirectly(file: ExtendedFile) {
  //   // TODO: Is debugging, remove
  //   console.log(file)
  // }

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
}
