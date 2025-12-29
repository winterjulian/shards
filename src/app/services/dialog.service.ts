import {Injectable, signal, Type} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  private open = signal<boolean>(false);
  private title = signal<string | undefined>(undefined);
  private message = signal<string | undefined>(undefined);
  private hint = signal<boolean>(false);
  private component = signal<Type<any> | null>(null); // *ngComponentOutlet accepts only null <.<

  private onAcceptCallback: (() => void) | undefined = undefined;
  private onCancelCallback: (() => void) | undefined = undefined;

  openWithComponent(
    title: string | undefined,
    component?: Type<any>,
    callbacks?: { accept?: () => void; cancel?: () => void }
  ) {
    // maybe for later
    this.title.set(undefined);
    this.message.set(undefined);
    if (component) {
      this.component.set(component);
    } else {
      this.component.set(null);
    }
    this.onAcceptCallback = callbacks?.accept ?? undefined;
    this.onCancelCallback = callbacks?.cancel ?? undefined;
    this.open.set(true);
  }

  openWithMessage(
    title: string | undefined,
    message: string,
    callbacks?: { accept?: () => void; cancel?: () => void },
    isHint: boolean = false // hint = no cancel / abort button
  ) {
    // message enuff for now :]
    this.title.set(title);
    this.message.set(message);
    this.component.set(null); // *ngComponentOutlet accepts only null <.<
    this.hint.set(isHint);
    this.onAcceptCallback = callbacks?.accept ?? undefined;
    this.onCancelCallback = callbacks?.cancel ?? undefined;
    this.open.set(true);
  }

  close() {
    this.open.set(false);
    this.title.set(undefined);
    this.message.set(undefined);
    this.component.set(null); // *ngComponentOutlet accepts only null <.<
    this.onAcceptCallback = undefined;
    this.onCancelCallback = undefined;
  }

  confirm() {
    const callback = this.onAcceptCallback;
    this.close();
    callback?.();
  }

  cancel() {
    const callback = this.onCancelCallback;
    this.close();
    callback?.();
  }

  isOpen() {
    return this.open();
  }

  getTitle() {
    return this.title();
  }

  getMessage() {
    return this.message();
  }

  isHint(): boolean {
    return this.hint();
  }

  getComponent() {
    return this.component();
  }
}
