import {Component, OnInit, output, signal} from '@angular/core';
import {StoreService} from '../../services/store.service';
import {FavoritesService} from '../../services/favorites.service';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {FavoriteDirectory} from '../../interfaces/favoriteDirectory';
import {ResponseObject} from '../../interfaces/responseObject';

@Component({
  selector: 'app-directory-favorites',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './directory-favorites.component.html',
  styleUrl: './directory-favorites.component.scss'
})
export class DirectoryFavoritesComponent implements OnInit {
  public isAdding = signal<boolean>(false);
  isLoading = output<boolean>();
  clickFavorite = output<string>();
  loadFiles = output<string>();

  constructor(public store: StoreService, private favoritesService: FavoritesService, private fb: FormBuilder) {}

  favoriteForm!: FormGroup;

  ngOnInit() {
    this.store.getFavoriteDirectories();
    this.defineForm();
  }

  public addFavoriteFolders() {
    this.toggleAddMode();
  }

  toggleAddMode() {
    this.isAdding.update(value => !value)
  }

  defineForm() {
    this.favoriteForm = this.fb.group({
      path: ['', Validators.required],
      name: [''],
      pinned: [false],
    });
  }

  selectDirectory() {
    this.favoritesService.openDirectory().then(r => {
      this.favoriteForm.patchValue({path: r})
    })
  }

  onSubmit(): void {
    if (this.favoriteForm.valid) {
      const formData: FavoriteDirectory = this.favoriteForm.value;
      this.favoritesService.addFavoriteDirectory(formData).then((response: ResponseObject) => {
        if (!response.isError) {
          this.store.getFavoriteDirectories();
        }
        this.favoriteForm.reset();
      })
    }
  }

  removeFavoriteDirectory(directory: FavoriteDirectory) {
    this.favoritesService.removeFavoriteDirectory(directory).then((response: ResponseObject) => {
      if (!response.isError) {
        this.store.getFavoriteDirectories();
      }
    })
  }

  cancelNewFavorite() {
    this.toggleAddMode();
    this.favoriteForm.reset();
  }

  getAllFilesFromGivenDirectory(directoryPath: string) {
    this.store.getAllFilesFromGivenDirectory(directoryPath);
  }

  getFiles(path: string) {
    this.store.getFilesByDialogue(path);
  }
}
