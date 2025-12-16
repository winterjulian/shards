import {computed, effect, inject, Injectable, signal} from '@angular/core';
import { ExtendedFile } from '../interfaces/extendedFile';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { HistoryService } from './history.service';
import {ExtendedFileGroup} from '../interfaces/extendedFileGroup';
import {FavoriteDirectory} from '../interfaces/favoriteDirectory';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  public history = inject(HistoryService);
  private interSnapshot: string[] = [];
  isLoading = signal<boolean>(false);
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
  searchStringSignal = signal<string>('');
  matchingShards = signal<string[]>([]);
  isRenaming = signal<boolean>(false);
  rearrangeFilesSignal = signal<ExtendedFileGroup[]>([]);
  isRearrangingFiles = signal<boolean>(false);
  isClearable = signal<boolean>(false);

  lastSelectedFile = signal<ExtendedFile | undefined>(undefined);
  favoriteDirectories = signal<FavoriteDirectory[] | undefined>(undefined);

  constructor(private router: Router) {
    effect(() => {
      const hasFiles = this.filesSignal().length > 0;
      console.log(hasFiles);
      if (hasFiles) {
        this.router.navigate(['/fileManagement']).then();
      } else {
        this.router.navigate(['/directorySelection']).then();
      }
    });
  }

  setIsLoading(bool: boolean, msDelay: number = 0) {
    if (bool) {
      this.isLoading.set(bool);
    } else {
      setTimeout(() => {
        this.isLoading.set(bool);
      }, msDelay)
    }
  }

  setFileIsSelected(file: ExtendedFile, isSelected: boolean) {
    if (file.isSelected === isSelected) return;

    file.isSelected = isSelected;
    isSelected ? this.lastSelectedFile.set(file) : this.lastSelectedFile.set(undefined);

    this.selectionCounterSignal.update(count => (isSelected ? count + 1 : count - 1));
  }

  setFileGroupIsSelected(fileGroup: ExtendedFileGroup, isSelected: boolean) {
    if (fileGroup.isSelected === isSelected) return;

    fileGroup.isSelected = isSelected;
  }

  groupFiles(index: number): void {
    const rearrangedFiles = this.rearrangeFilesSignal();
    const baseGroup = rearrangedFiles[index];

    if (!baseGroup.isSelected) return;

    const newArray = [...baseGroup.files];

    let i = index + 1;
    while (i < rearrangedFiles.length && rearrangedFiles[i].isSelected) {
      rearrangedFiles[i].files.forEach(file => newArray.push(file));
      rearrangedFiles.splice(i, 1);
      // no i++ bc element is deleted, index is therefore changed
      // i++
    }

    baseGroup.files = newArray;
  }

  ungroupFiles(index: number): void {
    const rearranged = this.rearrangeFilesSignal().slice(); // Kopie zum Bearbeiten
    const groupToUngroup = rearranged[index];

    // Neue Einzelgruppen erzeugen
    const individualGroups = groupToUngroup.files.map(file => ({
      isSelected: true,
      files: [file]
    }));

    // Ursprüngliche Gruppe durch Einzelgruppen ersetzen
    rearranged.splice(index, 1, ...individualGroups);

    // Signal aktualisieren
    this.rearrangeFilesSignal.set(rearranged);
  }

  setFilesByIndices(start: number, end: number, selected: boolean): void {
    const [from, to] = start < end ? [start, end] : [end, start];

    this.filesSignal.update(files =>
      files.map((file, i) => {
        if (i >= from && i <= to && file.isSelected !== selected) {
          this.selectionCounterSignal.update(count => (selected ? count + 1 : count - 1));
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
    });
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
    });
    this.selectionCounterSignal.set(counter);
  }

  deselectAll() {
    let counter = this.filesSignal().length;
    this.filesSignal().forEach((file: ExtendedFile) => {
      this.deselectFile(file);
      counter--;
    });
    this.selectionCounterSignal.set(counter);
  }

  invertSelection() {
    this.filesSignal().forEach((file: ExtendedFile) => {
      file.isSelected = !file.isSelected;
    });
    this.selectionCounterSignal.update(counter => this.filesSignal().length - counter);
  }

  resetVisibility() {
    this.setVisibilityCounter(this.filesSignal().length);
    this.filesSignal().forEach((file: ExtendedFile) => {
      file.isVisible = true;
    });
  }

  showSelectedFiles() {
    let visibilityCounter = 0;

    this.filesSignal().forEach((file: ExtendedFile) => {
      if (file.isSelected) {
        file.isVisible = true;
        visibilityCounter++;
      } else {
        file.isVisible = false;
      }
    });

    this.setVisibilityCounter(visibilityCounter);
  }

  resetSearch() {
    this.searchStringSignal.update(() => '');
    this.resetVisibility();
    this.resetMatchGroups();
    this.resetDisplayName();
    this.isClearable.update(() => false);
  }

  resetMatchGroups() {
    this.filesSignal().forEach((file: ExtendedFile) => {
      file.groups = [];
    });
  }

  resetDisplayName(): void {
    this.filesSignal().forEach((file: ExtendedFile) => {
      file.displayName = file.changedName;
    });
  }

  filterFiles(filterString: string) {
    let visibilityCounter = this.filesSignal().length;

    if (filterString === '') {
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
    });

    this.setVisibilityCounter(visibilityCounter);
  }

  getRegexGroups(filterString: string) {
    this.matchingShards.set([]);
    let pattern = new RegExp(filterString);
    let hasValue = false;

    this.filesSignal().forEach((file: ExtendedFile) => {
      file.groups = []; // clear groups;

      if (file.isSelected) {
        let matches = pattern.exec(file.changedName);

        if (matches) {
          hasValue ? void undefined : this.matchingShards.set(matches);
          hasValue = true;
          file.groups = matches;
        } else {
          file.isVisible = false;
          file.isSelected = false;
        }
      }
    });
  }

  filterFilesWithRegex(filterString: string) {
    this.isClearable.update(() => true);
    // TODO: Rework getting filter string (currently doubled)
    let visibilityCounter = this.filesSignal().length;
    let pattern = new RegExp(filterString);

    if (filterString === '') {
      this.resetSearch();
      return;
    }

    this.filesSignal().forEach((file: ExtendedFile) => {
      if (pattern.exec(file.name)) {
        file.isVisible = true;

        const regex = new RegExp(filterString, 'gi');

        file.displayName = file.name.replace(regex, '<span class="highlight-text">$&</span>');
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
      this.searchStringSignal.set(input);
    }
  }

  transferDisplayToChangedName() {
    this.filesSignal().forEach((file: ExtendedFile) => {
      file.changedName = file.displayName;
    });
  }

  changeFileIndex(event: CdkDragDrop<ExtendedFile[]>): void {
    if (event.previousIndex === event.currentIndex) return;

    this.filesSignal.update(files => {
      moveItemInArray(files, event.previousIndex, event.currentIndex);
      return files;
    });
  }

  changeFileGroupIndex(event: CdkDragDrop<ExtendedFileGroup[]>): void {
    if (event.previousIndex === event.currentIndex) return;

    this.rearrangeFilesSignal.update(fileGroups => {
      moveItemInArray(fileGroups, event.previousIndex, event.currentIndex);
      return fileGroups;
    });
  }

  deselectFile(file: ExtendedFile): void {
    file.isSelected = false;
    this.lastSelectedFile.set(undefined);
  }

  // HISTORY SERVICE

  addIntermediateSnapshot(): void {
    this.interSnapshot = this.filesSignal().map(f => f.changedName);
  }

  clearIntermediateSnapshot(): void {
    this.interSnapshot = [];
  }

  transferIntermediateSnapshot(): void {
    this.history.addSnapshot(this.interSnapshot);
  }

  canUndo() {
    return this.history.canUndo();
  }

  canRedo() {
    return this.history.canRedo();
  }

  resetFileNamesFromIntermediateSnapshot(): void {
    const intermediate = this.interSnapshot;

    if (!intermediate || intermediate.length === 0) return;

    const updatedFiles = this.filesSignal().map((file, index) => {
      const restoredName = intermediate[index];
      return {
        ...file,
        changedName: restoredName,
        displayName: restoredName,
      };
    });

    this.filesSignal.set(updatedFiles);
  }

  addSnapshotToHistory(): void {
    const names = this.filesSignal().map(f => f.changedName);
    this.history.addSnapshot(names);
  }

  getSnapShotFromHistory(): string[][] {
    return this.history.history;
  }

  undo(): void {
    const snapshot = this.history.undo();

    if (snapshot) {
      const updatedFiles = this.filesSignal().map((file, index) => ({
        ...file,
        changedName: snapshot[index],
        displayName: snapshot[index],
      }));
      this.filesSignal.set(updatedFiles);
    }
  }

  redo(): void {
    const snapshot = this.history.redo();

    if (snapshot) {
      const updatedFiles = this.filesSignal().map((file, index) => ({
        ...file,
        changedName: snapshot[index],
        displayName: snapshot[index],
      }));
      this.filesSignal.set(updatedFiles);
    }
  }

  getChangedFilesAsNumber(): number {
    let counter = 0;
    this.filesSignal().forEach((file: ExtendedFile) => {
      if (file.changedName !== file.name) {
        counter++;
      }
    });
    return counter;
  }

  clearHistory(): void {
    this.history.clear();
  }

  // FILE MANAGEMENT

  countChangedFiles(): number {
    let counter = 0;
    this.filesSignal().forEach((file: ExtendedFile) => {
      if (file.changedName !== file.name) {
        counter++;
      }
    });
    return counter;
  }

  getFilesByDialogue(path?: string) {
    this.setIsLoading(true);
    window.electron.openFiles(path).then((files: Array<ExtendedFile>) => {
      if (!files.length) {
        this.setIsLoading(false);
        return;
      } else {
        this.setFiles(files)
      }
      this.setIsLoading(false, 2000);
    });
  }

  getFilesByDirectory(directoryPath: string) {
    this.setIsLoading(true);
    window.electron.getFilesFromDirectory(directoryPath).then((files: Array<ExtendedFile>) => {
      if (!files.length) {
        this.setIsLoading(false, 2000);
        return;
      } else {
        this.setFiles(files);
      }
    });
  }

  setFiles(files: Array<ExtendedFile>) {
    this.filesSignal.set(files);
    this.resetVisibility();
    this.addSnapshotToHistory();
    this.setIsLoading(false, 1500);
  }

  getFavoriteDirectories() {
    window.electron.getFavoriteDirectories().then((directories: FavoriteDirectory[]) => {
      this.favoriteDirectories.set(directories);
    })
  }

  rearrangeFiles(): void {
    this.isRearrangingFiles.set(true);
    this.createRearrangeFilesSignal();
  }

  removeAllFiles() {
    this.filesSignal.set([]);
    this.selectionCounterSignal.set(0);
  }

  createRearrangeFilesSignal(): void {
    let array: ExtendedFileGroup[] = [];
    this.filesSignal().forEach((file: ExtendedFile) => {
      array.push(
        {
          isSelected: false,
          files: [file]
        }
      );
    })
    this.rearrangeFilesSignal.set(array);
  }

  renameFiles() {
    this.isRenaming.set(true);
    const filesToRename = this.filesSignal().filter(f => f.changedName !== f.name);

    window.electron.renameFiles(filesToRename).then(result => {
      if (result.success) {
        result.renamedFiles?.forEach((file: ExtendedFile) => {
          this.filesSignal()[file.index] = file;
        });
      } else {
        console.error('Fehler beim Umbenennen:', result.errors);
      }
      this.isRenaming.set(false);
    });
  }
}
