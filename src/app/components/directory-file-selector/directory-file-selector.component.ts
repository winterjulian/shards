import {Component, OnInit, signal} from '@angular/core';
import {FavoriteDirectory} from '../../interfaces/favoriteDirectory';
import {StoreService} from '../../services/store.service';
import {FavoritesService} from '../../services/favorites.service';
import {FavoriteDirectoriesComponent} from '../favorite-directories/favorite-directories.component';
import {DirectoryFavoritesComponent} from '../directory-favorites/directory-favorites.component';

@Component({
  selector: 'app-directory-file-selector',
  imports: [
    FavoriteDirectoriesComponent,
    DirectoryFavoritesComponent
  ],
  standalone: true,
  templateUrl: './directory-file-selector.component.html',
})
export class DirectoryFileSelectorComponent implements OnInit {
  readonly favorites = signal<FavoriteDirectory[]>([])
  public isLoading = signal<boolean>(false)

  constructor(public store: StoreService, public favoritesService: FavoritesService) {}

  ngOnInit() {
    this.getFavorites();
  }

  getFiles(e: any) {
    console.log(e);
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
