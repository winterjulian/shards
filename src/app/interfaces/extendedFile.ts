import { Shard } from './shard';

export interface ExtendedFile {
  readonly id: string;
  name: string;
  index: number;
  displayName: string;
  path: string;
  isSelected: boolean;
  isChanged: boolean;
  isVisible: boolean;
  length: number;
  extension: string;
  changedName: string;
  changeApproved: boolean; // deprecated
  groups: string[]; // deprecated
  shards?: Shard[]; // deprecated
  hasInternalWarning: boolean;
  hasExternalWarning: boolean;
  externalErrorMessage: string;
  size: number; //bytes
}
