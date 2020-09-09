import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Pet } from 'src/app/models/Pet';
import { PetService } from 'src/app/services/pet.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnInit {
  @Input() data;
  @Output() updateDataEvent = new EventEmitter<Object>();

  constructor(private petService: PetService) {}

  handleNext() {
    console.log(this.data);
    this.petService
      .changePage(this.data['_links']['next']['href'])
      .subscribe((data) => {
        console.log('data next', data);
        this.updateDataEvent.emit(data);
      });
  }

  handlePrev() {
    this.petService
      .changePage(this.data['_links']['previous']['href'])
      .subscribe((data) => {
        this.updateDataEvent.emit(data);
      });
  }

  ngOnInit(): void {}
}
