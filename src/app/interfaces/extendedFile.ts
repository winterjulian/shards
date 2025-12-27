import { Shard } from './shard';

export interface ExtendedFile {
  readonly name: string;
  readonly id: string;
  index: number;
  displayName: string;
  path: string;
  isSelected: boolean;
  changed: boolean;
  isVisible: boolean;
  length: number;
  extension: string;
  changedName: string;
  changeApproved: boolean; // deprecated
  groups: string[]; // deprecated
  shards?: Shard[]; // deprecated
  internalWarning: boolean;
  externalWarning: boolean;
}
