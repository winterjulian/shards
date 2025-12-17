import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[columnJump]',
  standalone: true
})
export class ColumnJumpDirective {

  @HostListener('keydown', ['$event'])
  onKeydown(event: KeyboardEvent) {
    // STRG + Enter (vorwärts / rückwärts)
    if (!event.ctrlKey || event.key !== 'Enter') {
      return;
    }

    event.preventDefault();

    const direction = event.shiftKey ? -1 : 1;
    this.jump(direction);
  }

  private jump(delta: number) {
    const active = document.activeElement;

    if (!(active instanceof HTMLInputElement)) {
      return;
    }

    const colStr = active.dataset['col'];
    const rowStr = active.dataset['row'];

    if (!colStr || !rowStr) return;

    const row = Number(rowStr);
    if (Number.isNaN(row)) return;

    const target = document.querySelector<HTMLInputElement>(
      `[data-col="${colStr}"][data-row="${row + delta}"]`
    );

    target?.focus();
  }
}
