import {Component, computed, inject, signal, WritableSignal} from '@angular/core';
import {StoreService} from '../../services/store.service';
import {NgForOf} from '@angular/common';
import {ShardColumnComponent} from '../../components/shard-column/shard-column.component';
import {ShardColumn} from '../../interfaces/shardColumn';
import {ShardsFooterComponent} from '../../components/shards-footer/shards-footer.component';
import {ShardsRowComponent} from '../../components/shards-row/shards-row.component';
import {ColumnJumpDirective} from '../../directives/column-jump.directive';

@Component({
  selector: 'app-shards-management-page',
  imports: [
    NgForOf,
    ShardsFooterComponent,
    ShardsRowComponent,
    ColumnJumpDirective
  ],
  templateUrl: './shards-management-page.component.html',
  styleUrl: './shards-management-page.component.scss'
})
export class ShardsManagementPageComponent {
  private store = inject(StoreService);

  protected files = computed(() => this.store.filesSignal().filter(f => f.isSelected));
  protected shardColumns: WritableSignal<WritableSignal<ShardColumn>[]> = signal([signal({
      name: 'test',
      content: '',
      omnipresent: true
    }
  )]);

  addColumn(index: number): void {
    const newColumn = signal({
      name: 'test',
      content: '',
      omnipresent: true
    });

    const newArray = [...this.shardColumns()];
    newArray.splice(index, 0, newColumn);

    this.shardColumns.set(newArray);
  }

  removeColumn(index: number): void {
    this.shardColumns().splice(index, 1);
  }

  updateContent(shardCol: WritableSignal<ShardColumn>, newContent: string) {
    shardCol.update(value => ({
      ...value,
      content: newContent
    }));
  }

  protected readonly top = top;
}
