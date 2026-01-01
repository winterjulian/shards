import {Injectable, signal} from '@angular/core';
import {ShardColumn} from '../interfaces/shardColumn';

@Injectable({
  providedIn: 'root',
})
export class ShardService {
  public shardColumns = signal<ShardColumn[]>([])
  public isShardsActive = signal<boolean>(false);

  addShardColumn(index: number = 0) {
    const newColumn = {
      name: 'test',
      content: '',
      omnipresent: true
    };

    const newArray = [...this.shardColumns()];
    newArray.splice(index, 0, newColumn);

    this.shardColumns.set(newArray);
  }
}
