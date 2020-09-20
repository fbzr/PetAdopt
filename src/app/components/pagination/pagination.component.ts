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
  @Output() updateDataEvent = new EventEmitter<Observable<Object>>();
  pages: number[];

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
      this.updateDataEvent.emit(
        this.petService.changePage(this.data?.current_page + 1)
      );
    }
  }

  handlePrev() {
    if (this.data?.current_page > 1) {
      this.updateDataEvent.emit(
        this.petService.changePage(this.data?.current_page - 1)
      );
    }
  }

  handlePageNumber(page: number) {
    // this.updateDataEvent.emit(this.petService.changePage(page));

    this.router.navigate([this.router.url], { queryParams: { page } });
  }

  ngOnInit(): void {
    this.pages = this.getPagination(this.data['current_page']);
    console.log(this.router.url);
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
