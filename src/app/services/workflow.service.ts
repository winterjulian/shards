import { Injectable, signal } from '@angular/core';

enum WorkflowPage {
  DirectoryManagement,
  FileManagement
}

@Injectable({
  providedIn: 'root',
})
export class WorkflowService {
  readonly isProcessing = signal<boolean>(false);
  readonly isInShardMode = signal<boolean>(false);
  readonly currentPage = signal<WorkflowPage>(WorkflowPage.DirectoryManagement);

  setIsProcessing(isProcessing: boolean): void {
    this.isProcessing.update(() => isProcessing);
  }

  setCurrentPage(desiredPage: WorkflowPage): void {
    this.currentPage.update(() => desiredPage);
  }
}
