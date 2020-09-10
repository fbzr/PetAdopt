import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { Pet } from 'src/app/models/Pet';
import { PetService } from 'src/app/services/pet.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnInit, OnChanges {
  @Input() data;
  @Output() updateDataEvent = new EventEmitter<Object>();
  pages: number[];

  constructor(private petService: PetService) {}

  getPagination(currentPage: number) {
    let count: number = 0;
    const pages = [];

    for (
      let page = currentPage - 2;
      page <= this.data['total_pages'] && count < 5;
      page++
    ) {
      if (page > 0) {
        pages.push(page);
        count++;
      }
    }

    return pages;
  }

  handleNext() {
    if (this.data?.current_page < this.data?.total_pages) {
      this.petService
        .changePage(this.data.current_page + 1)
        .subscribe((data) => {
          console.log('data next', data);
          this.updateDataEvent.emit(data);
        });
    }
  }

  handlePrev() {
    if (this.data?.current_page > 1) {
      this.petService
        .changePage(this.data?.current_page - 1)
        .subscribe((data) => {
          this.updateDataEvent.emit(data);
        });
    }
  }

  handlePageNumber(page: number) {
    this.petService.changePage(page).subscribe((data) => {
      this.updateDataEvent.emit(data);
    });
  }

  ngOnInit(): void {
    console.log('data', this.data);
    this.pages = this.getPagination(this.data['current_page']);
  }

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.

    // get previous and updated current_page and compare them

    const current_page = changes.data.currentValue?.current_page;
    const previous_page = changes.data.previousValue?.current_page;
    // update pages if values are different
    if (current_page !== previous_page) {
      this.pages = this.getPagination(current_page);
    }
  }
}
