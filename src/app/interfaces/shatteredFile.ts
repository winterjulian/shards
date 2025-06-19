import {Shard} from './shard';

export interface ShatteredFile {
  name: string;
  chosen: boolean;
  changed: boolean;
  length: number;
  type: string;
  shards: Shard[]
}
