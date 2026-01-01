import {Component, inject} from '@angular/core';
import {ShardService} from '../../../services/shard.service';

@Component({
  selector: 'app-shards-list-header',
  imports: [],
  standalone: true,
  templateUrl: './shards-list-header.component.html',
  styleUrl: './shards-list-header.component.scss'
})
export class ShardsListHeaderComponent {
  public shardsService = inject(ShardService)

}
