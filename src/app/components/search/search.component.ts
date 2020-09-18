import { Component, OnInit } from '@angular/core';
import Fuse from 'fuse.js';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  public fuse: any;
  public value: string;

  constructor() {}

  ngOnInit(): void {
    //instantiate Fuse with your object and options
    const options = {
      // isCaseSensitive: false,
      // includeScore: false,
      // shouldSort: true,
      // includeMatches: false,
      // findAllMatches: false,
      // minMatchCharLength: 1,
      // location: 0,
      // threshold: 0.6,
      // distance: 100,
      // useExtendedSearch: false,
      // ignoreLocation: false,
      // ignoreFieldNorm: false,
      keys: ['title', 'author.firstName'],
    };

    this.fuse = new Fuse([], options);
  }

  onKey(value: string) {
    this.value = value;
  }
}
