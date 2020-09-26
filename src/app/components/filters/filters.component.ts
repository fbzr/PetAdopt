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
      console.log(data);
      this.types = data['types'].map((type) => ({
        name: type['name'],
        value: type['_links']['self']['href'].split('/').slice(-1)[0],
      }));
    });
  }

  handleLocation(location: string) {
    this.setFilter.emit({ ...this.filter, location, page: 1 });
  }

  handleTypeSelect(value) {
    console.log(value);
    if (value) {
      this.setFilter.emit({ ...this.filter, type: value });
    } else {
      this.setFilter.emit(
        Object.keys(this.filter)
          .filter((filter) => filter !== 'type')
          .reduce((result, current) => {
            result[current] = this.filter[current];
            return result;
          }, {})
      );
    }
  }
}
