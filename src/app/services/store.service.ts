import {computed, Injectable, signal} from '@angular/core';
import {ExtendedFile} from '../interfaces/extendedFile';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  filesSignal = signal<ExtendedFile[]>([]);
  selectionCounterSignal = signal<number>(0);
  visibilitySignal = signal<number>(0);
  selectionPercentageSignal = computed(() => {
    const total = this.filesSignal().length;
    const selected = this.selectionCounterSignal();
    const rawPercentage = total > 0 ? (selected / total) * 100 : 0;
    return Math.round(rawPercentage * 10) / 10;
  });
  visibilityPercentageSignal = computed(() => {
    const total = this.filesSignal().length;
    const visible = this.visibilitySignal();
    const rawPercentage = total > 0 ? (visible / total) * 100 : 0;
    return Math.round(rawPercentage * 10) / 10;
  });
  searchStringSignal = signal<string>("");
  matchingShards = signal<string[]>([]);

  formerNames = signal<string[][]>([]);
  isClearable = signal<boolean>(false);

  lastSelectedFile = signal<ExtendedFile | undefined>(undefined);

  selectFile(file: ExtendedFile) {
    this.setFileIsSelected(file, !file.isSelected);
  }

  setFileIsSelected(file: ExtendedFile, isSelected: boolean) {
    if (file.isSelected === isSelected) return;

    file.isSelected = isSelected;
    isSelected ? this.lastSelectedFile.set(file) : this.lastSelectedFile.set(undefined);

    this.selectionCounterSignal.update(count =>
      isSelected ? count + 1 : count - 1
    );
  }

  setFilesByIndices(start: number, end: number, selected: boolean): void {
    const [from, to] = start < end ? [start, end] : [end, start];

    this.filesSignal.update(files =>
      files.map((file, i) => {
        if (i >= from && i <= to && file.isSelected !== selected) {
          this.selectionCounterSignal.update(count =>
            selected ? count + 1 : count - 1
          );
          return { ...file, isSelected: selected };
        }
        return file;
      })
    );
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
    this.selectionCounterSignal.set(counter);
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
    this.selectionCounterSignal.set(counter);
  }

  deselectAll() {
    let counter = this.filesSignal().length;
    this.filesSignal().forEach((file: ExtendedFile) => {
      this.deselectFile(file);
      counter--;
    })
    this.selectionCounterSignal.set(counter);
  }

  invertSelection() {
    this.filesSignal().forEach((file: ExtendedFile) => {
      file.isSelected = !file.isSelected;
    })
    this.selectionCounterSignal.update(counter => this.filesSignal().length - counter);
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
    this.formerNames.update(names => [...names, array]);
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

  changeFileIndex(event: CdkDragDrop<ExtendedFile[]>): void {
    if (event.previousIndex === event.currentIndex) return;

    this.filesSignal.update(files => {
      moveItemInArray(files, event.previousIndex, event.currentIndex);
      return files;
    });
  }

  deselectFile(file: ExtendedFile): void {
    file.isSelected = false;
    this.lastSelectedFile.set(undefined);
  }

  testFunc(inp: any) {
    console.log(inp);
  }
}
