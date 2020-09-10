import { Component, OnInit, Input } from '@angular/core';
import { Pet } from '../../models/Pet';
import { PetService } from 'src/app/services/pet.service';
import { LocationService } from 'src/app/services/location.service';
import { ViewportScroller } from '@angular/common';
import { Observable } from 'rxjs';
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
    private viewportScroller: ViewportScroller
  ) {}

  ngOnInit(): void {
    if (!this.pets) {
      this.loading = true;
      this.locationService.getCoords().subscribe(
        (location) => {
          this.petService
            .getPets({
              ...this.filter,
              location: `${location.latitude},${location.longitude}`,
            })
            .subscribe((data) => {
              this.pets = data['animals'];
              this.pagination = data['pagination'];
              this.loading = false;
            });
        },
        (error) => {
          console.log(error);
          this.petService.getPets(this.filter).subscribe((data) => {
            this.pets = data['animals'];
            this.pagination = data['pagination'];
            this.loading = false;
          });
        }
      );
    }
  }

  updatePets(observable: Observable<Object>): void {
    this.loading = true;
    this.viewportScroller.scrollToAnchor('featured');

    observable.subscribe((data) => {
      this.pets = data['animals'];
      this.pagination = data['pagination'];
      this.loading = false;
    });
  }
}
