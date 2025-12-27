import { Injectable } from '@angular/core';
import { HistorySnapshot } from '../interfaces/historySnapshot';

@Injectable({ providedIn: 'root' })
export class HistoryService {
  public history: HistorySnapshot[] = [];
  public currentIndex = -1;
  private readonly maxSteps = 20;

  addSnapshot(snapshot: HistorySnapshot): void {
    if (this.currentIndex < this.history.length - 1) {
      this.history = this.history.slice(0, this.currentIndex + 1);
    }

    this.history.push(this.cloneSnapshot(snapshot));
    this.currentIndex++;

    if (this.history.length > this.maxSteps) {
      this.history.shift();
      this.currentIndex--;
    }
  }

  undo(): HistorySnapshot | null {
    if (this.canUndo()) {
      this.currentIndex--;
      return this.cloneSnapshot(this.history[this.currentIndex]);
    }
    return null;
  }

  redo(): HistorySnapshot | null {
    if (this.canRedo()) {
      this.currentIndex++;
      return this.cloneSnapshot(this.history[this.currentIndex]);
    }
    return null;
  }

  canUndo(): boolean {
    return this.currentIndex > 0;
  }

  canRedo(): boolean {
    return this.currentIndex < this.history.length - 1;
  }

  clear(): void {
    this.history = [];
    this.currentIndex = -1;
  }

  private cloneSnapshot(snapshot: HistorySnapshot): HistorySnapshot {
    return {
      order: [...snapshot.order],
      names: { ...snapshot.names },
    };
  }
}
