import {Component, inject} from '@angular/core';
import {ShardService} from '../../../services/shard.service';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-shards-list-header',
  imports: [
    FormsModule
  ],
  standalone: true,
  templateUrl: './shards-list-header.component.html',
  styleUrl: './shards-list-header.component.scss'
})
export class ShardsListHeaderComponent {
  public shardsService = inject(ShardService)

  addShardColumn(index: number) {
    this.shardsService.addShardColumn(index);
  }

  deleteShardColumn(index: number) {
    this.shardsService.deleteShardColumn(index);
  }
}
