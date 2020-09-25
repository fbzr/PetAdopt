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
  @Output() setAddress: EventEmitter<any> = new EventEmitter();
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
      this.invokeEvent(place);
    });
  }

  invokeEvent(place: Object) {
    this.setAddress.emit(place);
    console.log('selected', place);
  }
}
