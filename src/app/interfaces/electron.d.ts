import { ExtendedFile } from './extendedFile';

declare global {
  interface Window {
    electron: {
      openFiles: () => Promise<ExtendedFile[]>;
      renameFiles: (
        filesToRename: ExtendedFile[]
      ) => Promise<{ success: boolean; errors?: Array<{ file: string; message: string }> }>;
    };
  }
}
