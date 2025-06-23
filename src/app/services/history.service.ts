import {Injectable} from '@angular/core';

@Injectable({ providedIn: 'root' })
export class HistoryService {
  public history: string[][] = [];
  private currentIndex = -1;
  private readonly maxSteps = 20;

  addSnapshot(names: string[]): void {
    if (this.currentIndex < this.history.length - 1) {
      this.history = this.history.slice(0, this.currentIndex + 1);
    }

    this.history.push([...names]);
    this.currentIndex++;

    if (this.history.length > this.maxSteps) {
      this.history.shift();
      this.currentIndex--;
    }
  }

  undo(): string[] | null {
    if (this.canUndo()) {
      this.currentIndex--;
      return [...this.history[this.currentIndex]];
    }
    return null;
  }

  redo(): string[] | null {
    if (this.canRedo()) {
      this.currentIndex++;
      return [...this.history[this.currentIndex]];
    }
    return null;
  }

  canUndo() {
    return this.currentIndex > 0;
  }

  canRedo() {
    return this.currentIndex < this.history.length - 1;
  }

  clear(): void {
    this.history = [];
    this.currentIndex = -1;
  }
}

