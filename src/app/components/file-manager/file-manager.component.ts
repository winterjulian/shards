import {Component, ElementRef, ViewChild } from '@angular/core';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';
import {FileListComponent } from '../file-list/file-list.component';
import {StoreService } from '../../services/store.service';
import {PercentageVerticalComponent } from '../percentage-vertical/percentage-vertical.component';
import {FileListWrapperComponent} from '../file-list-wrapper/file-list-wrapper.component';
import {FileGroupListComponent} from '../file-group-list/file-group-list.component';
import {FileListHeaderComponent} from '../file-list-header/file-list-header.component';
import {FileListFooterComponent} from '../file-list-footer/file-list-footer.component';
import {QuicktoolsComponent} from '../quicktools/quicktools.component';
import {ShardService} from '../../services/shard.service';
import {ShardsListHeaderComponent} from '../shards/shards-list-header/shards-list-header.component';

@Component({
  selector: 'app-file-manager',
  imports: [
    ReactiveFormsModule,
    FormsModule,
    FileListComponent,
    PercentageVerticalComponent,
    FileListWrapperComponent,
    FileGroupListComponent,
    FileListHeaderComponent,
    FileListFooterComponent,
    QuicktoolsComponent,
    ShardsListHeaderComponent,
  ],
  templateUrl: './file-manager.component.html',
  standalone: true,
  styleUrl: './file-manager.component.scss',
})
export class FileManagerComponent {
  @ViewChild('overlay') overlay: ElementRef | undefined;

  constructor(
    public store: StoreService,
    public shardsService: ShardService
  ) {
    // effect(() => {
    //   const isProcessing = this.store.isRenaming();
    //   const overlay = document.querySelector('.blocked-area');
    //
    //   if (isProcessing) {
    //     overlay?.classList.remove('hidden');
    //   } else {
    //     overlay?.classList.add('hidden');
    //   }
    // });
  }
}
