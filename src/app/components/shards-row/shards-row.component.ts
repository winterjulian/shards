import {Component, effect, Input, OnInit, signal, WritableSignal} from '@angular/core';
import {ShardColumn} from '../../interfaces/shardColumn';
import {NgForOf, NgIf} from '@angular/common';
import {ColumnJumpDirective} from '../../directives/column-jump.directive';
import {ColumnState} from '../../interfaces/columnState';

@Component({
  selector: 'app-shards-row',
  imports: [
    NgForOf,
    ColumnJumpDirective,
  ],
  standalone: true,
  templateUrl: './shards-row.component.html',
  styleUrl: './shards-row.component.scss'
})
export class ShardsRowComponent {
  @Input() shardColumns!: WritableSignal<WritableSignal<ShardColumn>[]>;
  @Input() rowIndex!: number;

  protected columnStates: ColumnState[] = [];
  protected isException = signal<boolean>(false);

  constructor() {
    effect(() => {
      this.shardColumns;
      this.shardColumns();
      console.log(this.shardColumns(), 'TEST')
    })
  }

  toggleLock(index: number) {
    this.columnStates[index].locked.update((value) => { return !value });
  }

  updateValue(colIndex: number, newValue: string) {
    const col = this.columnStates[colIndex];
    if (!col.locked()) {
      col.value.set(newValue);
    }
  }

  protected readonly String = String;
}
