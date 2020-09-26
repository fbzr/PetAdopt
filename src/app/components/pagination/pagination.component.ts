import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { PetService } from 'src/app/services/pet.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnInit, OnChanges {
  @Input() data;
  pages: number[];
  loading: boolean;

  constructor(private petService: PetService, private router: Router) {}

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
      this.handlePageNumber(this.data.current_page + 1);
    }
  }

  handlePrev() {
    if (this.data?.current_page > 1) {
      this.handlePageNumber(this.data.current_page - 1);
    }
  }

  handlePageNumber(page: number) {
    // this.updateDataEvent.emit(this.petService.changePage(page));
    const url = this.router.url.split('?')[0];
    this.router.navigate([url], {
      queryParams: { page },
    });
  }

  ngOnInit(): void {
    this.pages = this.getPagination(this.data['current_page']);
  }

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.

    // get previous and updated current_page and compare them
    const { currentValue, previousValue } = changes.data;

    const current_page = currentValue?.current_page;
    const previous_page = previousValue?.current_page;

    const current_total = currentValue?.total_pages;
    const previous_total = previousValue?.total_pages;

    // update pages if values are different
    if (current_page !== previous_page || current_total !== previous_total) {
      this.pages = this.getPagination(current_page);
    }
  }
}
