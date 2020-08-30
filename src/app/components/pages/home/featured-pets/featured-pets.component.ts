import { Component, OnInit } from '@angular/core';
import { Pet } from '../../../../models/Pet';
import { PetService } from 'src/app/services/pet.service';

@Component({
  selector: 'app-featured-pets',
  templateUrl: './featured-pets.component.html',
  styleUrls: ['./featured-pets.component.scss'],
})
export class FeaturedPetsComponent implements OnInit {
  pets: Pet[];

  constructor(private petService: PetService) {}

  ngOnInit(): void {
    if (!this.pets) {
      this.petService.getPets().subscribe((res) => {
        this.pets = res['animals'];
        console.log(this.pets);
      });
    }
  }
}
