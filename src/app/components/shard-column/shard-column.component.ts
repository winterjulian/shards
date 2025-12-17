import {Component, Input, input, output, Signal, WritableSignal} from '@angular/core';
import {NgForOf} from "@angular/common";
import {ShardColumn} from '../../interfaces/shardColumn';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ExtendedFile} from '../../interfaces/extendedFile';

@Component({
  selector: 'app-shard-column',
  imports: [
    NgForOf,
    ReactiveFormsModule,
    FormsModule
  ],
  standalone: true,
  templateUrl: './shard-column.component.html',
  styleUrl: './shard-column.component.scss'
})
export class ShardColumnComponent {
  @Input({ required: true }) givenShardCol!: WritableSignal<ShardColumn>;
  @Input({ required: true }) givenFiles!: Signal<ExtendedFile[]>;
  emitRemoveColumn = output<null>();

  setOmnipresence() {
    this.givenShardCol.update(value => ({
      ...value,
      omnipresent: !value.omnipresent,
      content: value.omnipresent ? value.content : value.content
    }));
  }

  updateContent(newContent: string) {
    this.givenShardCol.update(value => ({
      ...value,
      content: newContent
    }));
  }

  removeColumn() {
    this.emitRemoveColumn.emit(null)
  }
}
