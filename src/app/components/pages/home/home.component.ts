import { Component, OnInit } from '@angular/core';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  title: string = 'PetAdopt';
  constructor(private viewportScroller: ViewportScroller) {}

  ngOnInit(): void {}

  handleSearchClick(): void {
    this.viewportScroller.scrollToAnchor('featured');
  }
}
