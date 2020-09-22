import { Component, OnInit } from '@angular/core';
import Fuse from 'fuse.js';
import { PetService } from 'src/app/services/pet.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  public fuse: any;
  public value: string;
  public searchData: Object[];

  constructor(private petService: PetService) {}

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
      threshold: 0.4,
      // distance: 100,
      // useExtendedSearch: false,
      // ignoreLocation: false,
      // ignoreFieldNorm: false,
      keys: ['name', 'contact.city'],
    };

    this.fuse = new Fuse([], options);
  }

  onKey(value: string) {
    this.value = value;

    this.fuse.setCollection([]);

    this.petService.getCurrentPets().subscribe((res) => {
      // fuse.getIndex().size() gives size of collection

      res['animals'].forEach((pet) => {
        this.fuse.add(pet);
      });

      this.searchData += this.fuse.search(this.value);

      // while (this.searchData.length < res['pagination']['count_per_page'] && )
    });
  }
}
