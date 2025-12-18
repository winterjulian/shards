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
      this.columnStates = this.shardColumns().map((shardColSignal, i) => {
        const existing = this.columnStates[i];
        const value = existing?.value ?? signal(shardColSignal().content);
        const locked = existing?.locked ?? signal(false);
        locked(); value();

        if (!locked()) {
          value.set(shardColSignal().content);
        }

        return { value, locked };
      });
    });
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
