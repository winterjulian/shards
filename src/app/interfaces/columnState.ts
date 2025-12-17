import {WritableSignal} from '@angular/core';

export interface ColumnState {
  value: WritableSignal<string>;
  locked: WritableSignal<boolean>;
}
