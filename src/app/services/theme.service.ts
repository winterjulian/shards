import {inject, Injectable, signal} from '@angular/core';
import {DOCUMENT} from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly document = inject(DOCUMENT)
  readonly darkMode = signal<boolean>(false);

  constructor() {
    const browser = this.getBrowserPreferences();
    this.darkMode.set(browser);
    const localStorage = this.getLocalStorage();
    if (localStorage !== undefined) {
      this.darkMode.set(localStorage);
    }
    this.getLocalStorage();
    this.setTheme();
  }

  // GETTER

  private getBrowserPreferences(): boolean {
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  private getLocalStorage(): boolean | undefined {
    const darkMode = localStorage.getItem('darkMode');
    switch (darkMode) {
      case 'false':
        return false
      case 'true':
        return true
      default:
        return undefined;
    }
  }

  // SETTER

  setDisplayMode(darkMode: boolean) {
    this.darkMode.set(darkMode);
    localStorage.setItem('darkMode', String(darkMode));
    this.setTheme();
  }

  private setTheme() {
    if (this.darkMode()) {
      this.document.documentElement.classList.add('dark-mode');
    } else {
      this.document.documentElement.classList.remove('dark-mode');
    }
  }
}
