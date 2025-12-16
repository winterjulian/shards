import {Component, computed, inject, signal, WritableSignal} from '@angular/core';
import {StoreService} from '../../services/store.service';
import {NgForOf} from '@angular/common';
import {ShardColumnComponent} from '../../components/shard-column/shard-column.component';
import {ShardColumn} from '../../interfaces/shardColumn';

@Component({
  selector: 'app-shards-management-page',
  imports: [
    NgForOf,
    ShardColumnComponent
  ],
  templateUrl: './shards-management-page.component.html',
  styleUrl: './shards-management-page.component.scss'
})
export class ShardsManagementPageComponent {
  private store = inject(StoreService);

  protected files = computed(() => this.store.filesSignal().filter(f => f.isSelected));
  protected shardColumns: WritableSignal<ShardColumn>[] = []

  addColumn(): void {
    this.shardColumns.push(
      signal({
        name: 'test',
        content: '',
        omnipresent: true
      })
    );
  }
}
