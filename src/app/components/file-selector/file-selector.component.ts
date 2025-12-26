import {Component, OnInit, signal} from '@angular/core';
import { StoreService } from '../../services/store.service';
import {FavoritesService} from '../../services/favorites.service';
import {FavoriteDirectory} from '../../interfaces/favoriteDirectory';
import {FavoriteDirectoriesComponent} from '../favorite-directories/favorite-directories.component';

@Component({
  selector: 'app-file-selector',
  imports: [
    FavoriteDirectoriesComponent
  ],
  templateUrl: './file-selector.component.html',
  standalone: true,
  styleUrl: './file-selector.component.css',
})
export class FileSelectorComponent implements OnInit {
  readonly favorites = signal<FavoriteDirectory[]>([])
  public isLoading = signal<boolean>(false)

  constructor(public store: StoreService, public favoritesService: FavoritesService) {}

  ngOnInit() {
    this.getFavorites();
  }

  getFiles() {
    this.store.getFilesByDialogue();
  }

  getFavorites() {
    this.favoritesService.getFavoriteFolders().then(r =>
      this.favorites.set(r)
    );
  }

  public onIsLoading(bool: boolean) {
    this.isLoading.set(bool);
  }

  public onClickFavorites(favorite: string) {
    console.log(favorite);
  }

  public onLoadFiles(favorite: string) {
    console.log(favorite);
  }

}
