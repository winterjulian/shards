import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WorkflowService {
  readonly isProcessing = signal<boolean>(false);
  readonly isInShardMode = signal<boolean>(false);

  setIsProcessing(isProcessing: boolean): void {
    console.log('setIsProcessing', isProcessing);
    this.isProcessing.update(() => isProcessing);
  }

  setIsInShardMode(isInShardMode: boolean): void {
    this.isProcessing.update(() => isInShardMode);
  }
}
