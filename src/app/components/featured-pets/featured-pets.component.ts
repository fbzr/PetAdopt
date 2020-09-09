import { Component, OnInit, Input } from '@angular/core';
import { Pet } from '../../models/Pet';
import { PetService } from 'src/app/services/pet.service';
import { LocationService } from 'src/app/services/location.service';

@Component({
  selector: 'app-featured-pets',
  templateUrl: './featured-pets.component.html',
  styleUrls: ['./featured-pets.component.scss'],
})
export class FeaturedPetsComponent implements OnInit {
  @Input() pets: Pet[];
  @Input() filter: Object = {};

  constructor(
    private petService: PetService,
    private locationService: LocationService
  ) {}

  ngOnInit(): void {
    if (!this.pets) {
      this.locationService.getCoords().subscribe(
        (location) => {
          this.petService
            .getPets({
              ...this.filter,
              location: `${location.latitude},${location.longitude}`,
            })
            .subscribe((data) => {
              this.pets = data['animals'];
              console.log(this.pets);
            });
        },
        (error) => {
          console.log(error);
          this.petService.getPets(this.filter).subscribe((data) => {
            this.pets = data['animals'];
            console.log(this.pets);
          });
        }
      );
    }
  }
}
