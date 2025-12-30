import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {HeaderComponent} from './components/header/header.component';
import {DialogComponent} from './components/dialog/dialog.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, DialogComponent],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Shards';
}
