import { Component, OnInit, Input } from '@angular/core';
import { Pet } from '../../models/Pet';
import { PetService } from 'src/app/services/pet.service';

@Component({
  selector: 'app-featured-pets',
  templateUrl: './featured-pets.component.html',
  styleUrls: ['./featured-pets.component.scss'],
})
export class FeaturedPetsComponent implements OnInit {
  @Input() pets: Pet[];

  constructor(private petService: PetService) {}

  ngOnInit(): void {
    if (!this.pets) {
      this.petService.getPets().subscribe((data) => {
        this.pets = data['animals'];
        console.log(this.pets);
      });
    }
  }
}
