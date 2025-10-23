import { ExtendedFile } from './extendedFile';
import {FavoriteDirectory} from './favoriteDirectory';
import {ResponseObject} from './responseObject';

declare global {
  interface Window {
    electron: {
      openFiles: () => Promise<ExtendedFile[]>;
      getFilesFromDirectory: (directoryPath: string) => Promise<ExtendedFile[]>;
      renameFiles: (filesToRename: ExtendedFile[]) => Promise<{
        success: boolean;
        renamedFiles?: Array<ExtendedFile>;
        errors?: Array<{ file: string; message: string }>;
      }>;
      getFavoriteDirectories: () => Promise<FavoriteDirectory[]>;
      addFavoriteDirectory: (directory: FavoriteDirectory) => Promise<ResponseObject>;
      removeFavoriteDirectory: (directory: FavoriteDirectory) => Promise<ResponseObject>;
      openDirectory: () => Promise<string | null>;
    };
  }
}
