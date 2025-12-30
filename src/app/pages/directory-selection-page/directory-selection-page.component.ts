import {Component, inject} from '@angular/core';
import {StoreService} from '../../services/store.service';
import {DirectoryFooterComponent} from '../../components/directory-footer/directory-footer.component';
import {
  DirectoryFileSelectorComponent
} from '../../components/directory-file-selector/directory-file-selector.component';

@Component({
  selector: 'app-directory-selection-page',
  imports: [
    DirectoryFooterComponent,
    DirectoryFileSelectorComponent,
  ],
  standalone: true,
  templateUrl: './directory-selection-page.component.html',
  styleUrl: './directory-selection-page.component.scss'
})
export class DirectorySelectionPageComponent {
  public store = inject(StoreService);
}

