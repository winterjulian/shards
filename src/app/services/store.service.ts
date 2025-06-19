import {computed, effect, Injectable, signal} from '@angular/core';
import {HttpClientService} from './http-client.service';
import {BehaviorSubject} from 'rxjs';
import {ExtendedFile} from '../interfaces/extendedFile';
import {NameService} from './name.service';

declare global {
  interface Window {
    electron: {
      openFiles: () => Promise<ExtendedFile[]>;
    };
  }
}

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  filesSignal = signal<ExtendedFile[]>([]);
  selectionSignal = signal<number>(0);
  visibilitySignal = signal<number>(0);
  selectionPercentageSignal = computed(() => {
    const total = this.filesSignal().length;
    const selected = this.selectionSignal();
    const rawPercentage = total > 0 ? (selected / total) * 100 : 0; // Vermeidung von Division durch 0
    return Math.round(rawPercentage * 10) / 10; // Auf eine Dezimalstelle runden
  });
  visibilityPercentageSignal = computed(() => {
    const total = this.filesSignal().length;
    const visible = this.visibilitySignal();
    const rawPercentage = total > 0 ? (visible / total) * 100 : 0; // Vermeidung von Division durch 0
    return Math.round(rawPercentage * 10) / 10; // Auf eine Dezimalstelle runden
  });
  searchStringSignal = signal<string>("");
  matchingShards = signal<string[]>([]);

  formerNames = signal<string[][]>([]);
  isClearable = signal<boolean>(false);

  constructor(
    private httpClient: HttpClientService,
  ) {}

  selectFile(file: ExtendedFile) {
    if (file.isSelected) {
      this.selectionSignal.update(counter => counter - 1);
      file.isSelected = false;
    } else {
      this.selectionSignal.update(counter => counter + 1);
      file.isSelected = true;
    }
  }

  selectOrDeselectAll(bool: boolean) {
    let counter = bool ? 0 : this.filesSignal().length;
    this.filesSignal().forEach((file: ExtendedFile) => {
      if (file.isVisible) {
        file.isSelected = bool;
        bool ? counter++ : counter--;
      } else {
        file.isSelected = !bool;
      }
    })
    this.selectionSignal.set(counter);
  }

  selectAll() {
    let counter = 0;
    this.filesSignal().forEach((file: ExtendedFile) => {
      if (file.isVisible) {
        file.isSelected = true;
        counter++;
      } else {
        file.isSelected = false;
      }
    })
    this.selectionSignal.set(counter);
  }

  deselectAll() {
    let counter = this.filesSignal().length;
    this.filesSignal().forEach((file: ExtendedFile) => {
      file.isSelected = false;
      counter--;
    })
    this.selectionSignal.set(counter);
  }

  invertSelection() {
    this.filesSignal().forEach((file: ExtendedFile) => {
      file.isSelected = !file.isSelected;
    })
    this.selectionSignal.update(counter => this.filesSignal().length - counter);
  }

  resetVisibility() {
    this.setVisibilityCounter(this.filesSignal().length)
    this.filesSignal().forEach((file: ExtendedFile) => {
      file.isVisible = true;
    })
  }

  showSelectedFiles() {
    let visibilityCounter = 0;

    this.filesSignal().forEach((file: ExtendedFile) => {
      if (file.isSelected) {
        file.isVisible = true;
        visibilityCounter++
      } else {
        file.isVisible = false;
      }
    })

    this.setVisibilityCounter(visibilityCounter);
  }

  resetSearch() {
    console.log('RESET SEARCH');
    this.searchStringSignal.update(() => "");
    this.resetVisibility();
    this.resetMatchGroups();
    this.resetDisplayName();
    this.isClearable.update(() => false)
  }

  resetMatchGroups() {
    this.filesSignal().forEach((file: ExtendedFile) => {
      file.groups = [];
    })
  }

  resetDisplayName(): void {
    this.filesSignal().forEach((file: ExtendedFile) => {
      file.displayName = file.changedName;
    })
  }

  filterFiles(filterString: string) {
    let visibilityCounter = this.filesSignal().length;

    if (filterString === "") {
      this.resetSearch();
      return;
    }

    this.filesSignal().forEach((file: ExtendedFile) => {
      if (file.isVisible && file.name.includes(filterString)) {
        file.isVisible = true;
      } else {
        file.isVisible = false;
        visibilityCounter -= 1;
      }
    })

    this.setVisibilityCounter(visibilityCounter);
  }

  getRegexGroups(filterString: string) {
    this.matchingShards.set([])
    let pattern = new RegExp(filterString)
    let hasValue = false;

    this.filesSignal().forEach((file: ExtendedFile) => {
      file.groups = [] // clear groups;

      if (file.isSelected) {
        let matches = pattern.exec(file.changedName)

        if (matches) {
          hasValue ? void undefined : this.matchingShards.set(matches);
          hasValue = true;
          file.groups = matches;
        } else {
          file.isVisible = false;
          file.isSelected = false;
        }
      }
    })
  }

  filterFilesWithRegex(filterString: string) {
    this.isClearable.update(() => true);
    // TODO: Rework getting filter string (currently doubled)
    let visibilityCounter = this.filesSignal().length;
    let pattern = new RegExp(filterString);

    if (filterString === "") {
      this.resetSearch();
      return;
    }

    this.filesSignal().forEach((file: ExtendedFile) => {
      console.log("File Name:", file.name);
      console.log("Search Pattern:", pattern);

      if (pattern.exec(file.name)) {
        file.isVisible = true;

        const regex = new RegExp(filterString, 'gi');
        console.log("Generated Regex:", regex);

        file.displayName = file.name.replace(regex, '<span class="highlight">$&</span>');
        console.log("Highlighted Display Name:", file.displayName);
      } else {
        file.isVisible = false;
        visibilityCounter -= 1;
      }
    });

    this.setVisibilityCounter(visibilityCounter);
  }

  setVisibilityCounter(input: number) {
    this.visibilitySignal.set(input);
  }

  setSearchStringSignal(input: any) {
    if (input) {
      this.searchStringSignal.set(input)
    }
  }

  getFilesByDialogue() {
    window.electron.openFiles().then((files: Array<ExtendedFile>) => {
      this.filesSignal.set(files);
      this.resetVisibility();
    })
  }

  createNameCopy() {
    let array: string[] = []
    this.filesSignal().forEach(file => {
      array.push(file.changedName);
    })
    console.log(array);
    this.formerNames.update(names => [...names, array]);
    console.log(this.formerNames());
  }

  get isUndoNameChangesPossible() {
    return this.formerNames().length > 0;
  }

  findNextSelectedFileUp(startIndex: number) {
    for (let i = startIndex + 1; i < this.filesSignal().length; i++) {
      if (this.filesSignal()[i].isSelected) {
        return i;
      }
    }
    return -1;
  }

  findNextSelectedFileDown(startIndex: number) {
    for (let i = startIndex - 1; i >= 0; i--) {
      if (this.filesSignal()[i].isSelected) {
        return i;
      }
    }
    return -1;
  }

  undoNameChange() {
    this.filesSignal().forEach((file: ExtendedFile, index: number) => {
      file.changedName = this.formerNames()[this.formerNames().length-1][index]
    })
  }

  testFunc(inp: any) {
    console.log(inp);
  }
}
