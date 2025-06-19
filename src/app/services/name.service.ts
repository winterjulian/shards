import {Injectable} from '@angular/core';
import {StoreService} from './store.service';

@Injectable({
  providedIn: 'root'
})
export class NameService {

  constructor(private store: StoreService) {}

  replaceString(pattern: string, replacement: string) {
    this.store.filesSignal().forEach(file => {
      if (file.isSelected) {
        file.changedName = file.name.replace(pattern, replacement);
        file.changed = true;
      }
    })
  }
}
