import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WorkflowService {
  readonly isProcessing = signal<boolean>(false);

  setIsProcessing(isProcessing: boolean) {
    this.isProcessing.update(() => isProcessing);
  }
}
