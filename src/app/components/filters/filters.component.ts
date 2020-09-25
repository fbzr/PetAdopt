import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
})
export class FiltersComponent implements OnInit {
  @Input() filter: Object = {};
  @Output() setFilter: EventEmitter<any> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  getLocation(location: string) {
    this.setFilter.emit({ ...this.filter, location });
  }
}
