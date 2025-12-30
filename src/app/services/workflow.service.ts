import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WorkflowService {
  readonly isProcessing = signal<boolean>(false);
  readonly isInShardMode = signal<boolean>(false);

  setIsProcessing(isProcessing: boolean): void {
    this.isProcessing.update(() => isProcessing);
  }
}
