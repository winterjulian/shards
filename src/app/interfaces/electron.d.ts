import { ExtendedFile } from './extendedFile';

declare global {
  interface Window {
    electron: {
      openFiles: () => Promise<ExtendedFile[]>;
      renameFiles: (filesToRename: ExtendedFile[]) => Promise<{
        success: boolean;
        renamedFiles?: Array<ExtendedFile>;
        errors?: Array<{ file: string; message: string }>;
      }>;
    };
  }
}
