import { Component, signal } from '@angular/core';
import { StoreService } from '../../../services/store.service';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'app-shards-repositioner',
  imports: [NgForOf],
  templateUrl: './shards-repositioner.component.html',
  standalone: true,
  styleUrl: './shards-repositioner.component.css',
})
export class ShardsRepositionerComponent {
  public searchShardsString: string = '';

  constructor(public store: StoreService) {}

  setTestRegex() {
    this.searchShardsString = '^(\\d+)\\s-\\s([A-Za-z]+)\\s([A-Za-z]+)\\s?(.*)';
  }

  setShardsSearchString(input: string) {
    this.searchShardsString = input;
  }

  searchForGroups() {
    this.store.getRegexGroups(this.searchShardsString);
  }

  resetShardsSearch() {
    this.searchShardsString = '';
  }
}
