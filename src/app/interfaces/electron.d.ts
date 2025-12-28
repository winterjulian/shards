import { ExtendedFile } from './extendedFile';
import {FavoriteDirectory} from './favoriteDirectory';
import {ResponseObject} from './responseObject';

declare global {
  interface Window {
    electron: {
      openFiles: (path?: string) => Promise<ExtendedFile[]>;
      getFilesFromDirectory: (directoryPath: string) => Promise<ExtendedFile[]>;
      renameFiles: (filesToRename: ExtendedFile[]) => Promise<{
        successful: Array<string>;
        erroneous: Array<{ id: string; externalErrorMessage: string }>;
      }>;
      getFavoriteDirectories: () => Promise<FavoriteDirectory[]>;
      addFavoriteDirectory: (directory: FavoriteDirectory) => Promise<ResponseObject>;
      removeFavoriteDirectory: (directory: FavoriteDirectory) => Promise<ResponseObject>;
      openDirectory: () => Promise<string | null>;
    };
  }
}
