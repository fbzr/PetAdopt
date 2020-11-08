import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Pet } from '../../models/Pet';
import { PetService } from 'src/app/services/pet.service';
import { LocationService } from 'src/app/services/location.service';
import { ViewportScroller } from '@angular/common';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-featured-pets',
  templateUrl: './featured-pets.component.html',
  styleUrls: ['./featured-pets.component.scss'],
})
export class FeaturedPetsComponent implements OnInit {
  @Input() pets: Pet[];
  @Input() filter: Object = {};
  pagination: Object;
  loading: Boolean = false;
  faSpinner = faSpinner;

  constructor(
    private petService: PetService,
    private locationService: LocationService,
    private viewportScroller: ViewportScroller,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((routeParams) => {
      let page = routeParams.get('page');

      if (page) {
        this.viewportScroller.scrollToAnchor('featured');
      } else {
        page = '1';
      }

      // update filter with pages from query params
      this.filter = { ...this.filter, page };
      this.loading = true;

      // request location and handles success and error (user not allowing location access)
      this.locationService.requestCoords().subscribe(
        // success
        (location) => {
          this.petService.getPets(this.filter).subscribe((data) => {
            this.pets = data['animals'];
            this.pagination = data['pagination'];
            this.loading = false;
          });
        },
        // error
        (error) => {
          console.log(error);
          this.petService.getPets(this.filter).subscribe((data) => {
            this.pets = data['animals'];
            this.pagination = data['pagination'];
            this.loading = false;
          });
        }
      );
    });
  }

  update(filter: Object): void {
    this.loading = true;
    this.filter = filter;

    this.petService.getPets(this.filter).subscribe((data) => {
      this.pets = data['animals'];
      this.pagination = data['pagination'];
      this.loading = false;
    });
  }
}
