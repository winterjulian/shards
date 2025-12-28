import {computed, effect, inject, Injectable, signal} from '@angular/core';
import { ExtendedFile } from '../interfaces/extendedFile';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { HistoryService } from './history.service';
import {ExtendedFileGroup} from '../interfaces/extendedFileGroup';
import {FavoriteDirectory} from '../interfaces/favoriteDirectory';
import {DialogService} from './dialog.service';
import {timeout} from 'rxjs';
import {HistorySnapshot} from '../interfaces/historySnapshot';
import {ErroneousResponse} from '../interfaces/erroneousResponse';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  public historyService = inject(HistoryService);
  public dialogService = inject(DialogService);
  private intermediateSnapshot: string[] = [];
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
  hasChangedFiles = signal<boolean>(false);
  changedFilesCounter = signal<number>(0);

  lastSelectedFile = signal<ExtendedFile | undefined>(undefined);
  favoriteDirectories = signal<FavoriteDirectory[] | undefined>(undefined);

  constructor() {
    effect(() => {
      this.changedFilesCounter.set(
        this.filesSignal().filter(f => f.isChanged).length
      );
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
    this.filesSignal.update(files => {
      let counter = 0;

      const updatedFiles = files.map(file => {
        const isSelected = file.isVisible;
        if (isSelected) counter++;
        return { ...file, isSelected };
      });

      this.selectionCounterSignal.set(counter);
      return updatedFiles;
    });
  }

  selectAllChanged() {
    let counter = 0;

    this.filesSignal.update(files =>
      files.map(file => {
        const isSelected = file.isChanged;
        if (isSelected) counter++;
        return { ...file, isSelected };
      })
    );

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
    const updatedFiles = this.filesSignal().map(file => {
      const changedName = file.displayName;
      const isChanged = file.name !== changedName;

      return {
        ...file,
        changedName,
        isChanged,
      };
    });

    this.filesSignal.set(updatedFiles);
  }

  changeFileIndex(event: CdkDragDrop<ExtendedFile[]>): void {
    console.log('changeFileIndex');
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

  addIntermediateSnapshot(): void {
    console.log('addIntermediateSnapshot');
    this.intermediateSnapshot = this.filesSignal().map(f => f.changedName);
  }

  clearIntermediateSnapshot(): void {
    this.intermediateSnapshot = [];
  }

  resetFileNamesFromIntermediateSnapshot(): void {
    const intermediate = this.intermediateSnapshot;

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

  // HISTORY SERVICE

  // transferIntermediateSnapshot(): void {
  //   this.historyService.addSnapshot(this.intermediateSnapshot);
  // }

  canUndo() {
    return this.historyService.canUndo();
  }

  canRedo() {
    return this.historyService.canRedo();
  }

  addSnapshotToHistory(): void {
    const files = this.filesSignal();
    const snapshot: HistorySnapshot = {
      order: files.map(f => f.id),
      names: Object.fromEntries(files.map(f => [f.id, f.changedName])),
    };

    this.historyService.addSnapshot(snapshot);
  }

  getSnapShotFromHistory(): HistorySnapshot[] {
    return this.historyService.history;
  }

  undo(): void {
    const snapshot = this.historyService.undo();
    if (!snapshot) return;
    this.processSnapshot(snapshot);
  }

  redo(): void {
    const snapshot = this.historyService.redo();
    if (!snapshot) return;
    this.processSnapshot(snapshot);
  }

  processSnapshot(snapshot: HistorySnapshot): void {
    const fileMap = new Map(this.filesSignal().map(f => [f.id, f]));
    const updatedFiles = snapshot.order.map(id => {
      const file = fileMap.get(id)!;
      const newName = snapshot.names[id];

      return {
        ...file,
        changedName: newName,
        displayName: newName,
        changed: file.name !== newName,
      };
    });

    this.filesSignal.set(updatedFiles);
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
    this.historyService.clear();
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
      this.setIsLoading(false, 1500);
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
    this.clearHistory();
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
    const filesToRename = this.filesSignal().filter(f => f.isChanged);

    window.electron.renameFiles(filesToRename).then(result => {
      const successfulSet = new Set(result.successful);
      const erroneousMap = new Map(result.erroneous.map(e => [e.id, e]));

      this.filesSignal.update(files =>
        files.map(file => {
          if (successfulSet.has(file.id)) {
            return this.handleSuccessfulRenaming(file);
          }

          if (erroneousMap.has(file.id)) {
            return this.handleErroneousRenaming(file, erroneousMap);
          }

          return file;
        })
      );

      setTimeout(() => {
        this.isRenaming.set(false);
      }, 1500);
    });
  }

  handleSuccessfulRenaming(file: ExtendedFile) {
    return {
      ...file,
      name: file.changedName,
      isChanged: false,
      hasInternalWarning: false,
      hasExternalWarning: false,
      externalErrorMessage: ''
    };
  }

  handleErroneousRenaming(file: ExtendedFile, map: Map<string, ErroneousResponse>) {
    const err = map.get(file.id);

    return {
      ...file,
      hasExternalWarning: true,
      externalErrorMessage: err?.externalErrorMessage ?? 'Unknown error occurred.'
    };
  }

  public newRenameFiles(): void {
    let conflictingFiles = this.checkForFileNameDuplicates();
    let conflictingMessage: string = conflictingFiles.length === 1
      ? 'file was identical to another and created a conflict. Please rename the file.'
      : 'files were identical to other files and created a conflict. Please rename the files.';
    console.log(conflictingFiles);
    console.log(conflictingFiles.length > 0);

    if (conflictingFiles.length > 0) {
      this.dialogService.openWithMessage(
        'Name conflict',
        `${conflictingFiles.length} ${conflictingMessage}`,
        {
          accept: () => {
            console.log('test');
          }
        },
        true
      )
      console.log('end of if')
    } else {
      this.renameFiles();
    }
  }

  checkForFileNameDuplicates(): ExtendedFile[] {
    const conflictingFiles: ExtendedFile[] = []
    const seen = new Set<string>();

    for (const file of this.filesSignal()) {
      if (!file.isChanged) {
        seen.add(file.name.toLowerCase());
      }
    }

    for (const file of this.filesSignal()) {
      if (!file.isChanged) continue;

      const key = file.changedName.toLowerCase();

      if (seen.has(key)) {
        file.hasInternalWarning = true;
        conflictingFiles.push(file);
      } else {
        seen.add(key);
      }
    }

    return conflictingFiles;
  }
}
