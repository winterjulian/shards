import {ExtendedFile} from './extendedFile';

export interface RenamingEntry {
  file: ExtendedFile,
  oldName: string,
  newName: string,
}
