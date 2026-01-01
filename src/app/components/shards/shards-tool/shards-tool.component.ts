import {Component, effect, input, signal} from '@angular/core';
import {ShardService} from '../../../services/shard.service';

@Component({
  selector: 'app-shards-tool',
  imports: [],
  templateUrl: './shards-tool.component.html',
  styleUrl: './shards-tool.component.scss'
})
export class ShardsToolComponent {
  isExpanded = input<boolean>(false);
  public isAcceptDisabled = signal<boolean>(true);

  constructor(private shardService: ShardService) {
    this.shardService.addShardColumn();
    effect(() => {
      if (this.isExpanded()) {
        this.shardService.isShardsActive.set(true);
      } else {
        this.shardService.isShardsActive.set(false);
      }
    })
  }

  onAccept(): void {
    return;
  }

  onCancel(): void {
    this.shardService.isShardsActive.set(false);
    return;
  }

  addShard(): void {
    this.shardService.addShardColumn();
  }
}
