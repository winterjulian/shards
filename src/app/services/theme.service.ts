import {Injectable, signal} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  public readonly darkMode = signal<boolean>(false);

  constructor() {
    this.getModePreferences();
    this.setDarkMode();
  }

  private getModePreferences(): void {
    let localStorage = this.scanLocalStorage();
    if (localStorage !== undefined) {
      this.darkMode.set(localStorage);
    } else {
      let preferences = this.scanPreferences();
      this.darkMode.set(preferences);
    }
  }

  private scanPreferences() {
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  }

  private scanLocalStorage(): boolean | undefined {
    const darkMode = localStorage.getItem("darkMode");
    switch (darkMode) {
      case 'false':
        return false;
      case 'true':
        return true;
      /*
      treat null not as false, else if nothing is set in the local storage,
      system-preferences will be overwritten
      */
      case null:
        return undefined;
      default:
        return undefined
    }
  }

  setDarkModeInLocalStorage(darkMode: boolean) {
    localStorage.removeItem("darkMode");
    localStorage.setItem("darkMode", String(darkMode));
  }

  // only relevant in superb-calendar

  private setDarkMode() {
    if (this.darkMode()) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }

  toggleDarkMode(): void {
    this.darkMode.update(isDark => {
      return !isDark;
    });
    this.setDarkMode();
    this.setDarkModeInLocalStorage(this.darkMode());
  }

}
