import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PetService } from 'src/app/services/pet.service';

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

  constructor(private petService: PetService) {}

  ngOnInit(): void {
    this.petService.getPetTypes().subscribe((data) => {
      this.types = data['types'].map((type) => ({
        name: type['name'],
        value: type['_links']['self']['href'].split('/').slice(-1)[0],
      }));
    });
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
