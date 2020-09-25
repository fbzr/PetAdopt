import {
  AfterViewInit,
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-autocomplete-input',
  templateUrl: './autocomplete-input.component.html',
  styleUrls: ['./autocomplete-input.component.scss'],
})
export class AutocompleteInputComponent implements OnInit, AfterViewInit {
  @ViewChild('cityText') cityText: any;
  @Output() setLocation: EventEmitter<any> = new EventEmitter();
  autocompleteInput: string;

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.getAutocomplete();
  }

  private getAutocomplete() {
    const autocomplete = new google.maps.places.Autocomplete(
      this.cityText.nativeElement,
      {
        componentRestrictions: { country: 'US' },
        types: ['(cities)'],
      }
    );

    google.maps.event.addListener(autocomplete, 'place_changed', () => {
      const place = autocomplete.getPlace();

      // types: ["locality", "political"] is City
      // types: ["administrative_area_level_1", "political"] is State
      const [city] = place['address_components']
        .filter((el) => el['types'][0] === 'locality')
        .map((el) => el['long_name']);

      const [state] = place['address_components']
        .filter((el) => el['types'][0] === 'administrative_area_level_1')
        .map((el) => el['short_name']);

      this.setLocation.emit(`${city}, ${state}`);
    });
  }
}
