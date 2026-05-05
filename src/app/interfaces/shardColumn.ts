import {WritableSignal} from '@angular/core';

export interface ShardColumn {
  content: WritableSignal<string>;
}
