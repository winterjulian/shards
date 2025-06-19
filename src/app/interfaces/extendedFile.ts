import {Shard} from './shard';

export interface ExtendedFile {
  readonly name: string;
  index: number;
  displayName: string;
  groups: string[];
  path: string;
  isSelected: boolean;
  changed: boolean;
  isVisible: boolean;
  length: number;
  extension: string;
  changedName: string;
  changeApproved: boolean;
  shards?: Shard[];
}
