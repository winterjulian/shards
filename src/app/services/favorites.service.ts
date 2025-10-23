import { Injectable } from '@angular/core';
import {FavoriteDirectory} from '../interfaces/favoriteDirectory';
import {ResponseObject} from '../interfaces/responseObject';

@Injectable({ providedIn: 'root' })
export class FavoritesService {
  async getFavoriteFolders(): Promise<FavoriteDirectory[]> {
    return await window.electron.getFavoriteDirectories();
  }

  async addFavoriteDirectory(directory: FavoriteDirectory): Promise<ResponseObject> {
    return await window.electron.addFavoriteDirectory(directory);
  }

  async removeFavoriteDirectory(directory: FavoriteDirectory): Promise<ResponseObject> {
    return await window.electron.removeFavoriteDirectory(directory);
  }

  async openDirectory(): Promise<string | null> {
    return await window.electron.openDirectory();
  }
}
