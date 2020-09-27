import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PetService } from 'src/app/services/pet.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
})
export class FiltersComponent implements OnInit {
  @Input() filter: Object = {};
  @Output() setFilter: EventEmitter<any> = new EventEmitter();
  types: {
    name: string;
    value: string;
  }[];

  constructor(private petService: PetService, private router: Router) {}

  ngOnInit(): void {
    this.petService.getPetTypes().subscribe((data) => {
      this.types = data['types'].map((type) => ({
        name: type['name'],
        value: type['_links']['self']['href'].split('/').slice(-1)[0],
      }));
    });
  }

  isSpecificTypePage(): boolean {
    // check if current page is dogs page or cats page
    // hide type filter if it is
    const page = this.router.url.split('/')[1].split('?')[0];
    return page.includes('dogs') || page.includes('cats');
  }

  handleFilter(property: string, value: string): void {
    if (value) {
      this.addFilter(property, value);
    } else {
      this.removeFilter(property);
    }
  }

  private addFilter(property: string, value: any): void {
    this.setFilter.emit({ ...this.filter, page: 1, [property]: value });
  }

  private removeFilter(property: string): void {
    this.setFilter.emit(
      Object.keys(this.filter)
        .filter((filter) => filter !== property)
        .reduce((result, current) => {
          result[current] = this.filter[current];
          return result;
        }, {})
    );
  }
}
