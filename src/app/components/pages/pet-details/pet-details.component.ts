import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Pet } from 'src/app/models/Pet';
import { PetService } from 'src/app/services/pet.service';

@Component({
  selector: 'app-pet-details',
  templateUrl: './pet-details.component.html',
  styleUrls: ['./pet-details.component.scss'],
})
export class PetDetailsComponent implements OnInit {
  id: number;
  pet: Pet;
  organization: Object;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private petService: PetService
  ) {
    // get pet state passed by router link state
    this.pet = this.router.getCurrentNavigation().extras.state?.pet;

    console.log(this.pet);
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
    });

    // if pet was not passed through router link state (eg: page reloading)
    // fetch pet data using id
    if (!this.pet) {
      this.petService.getPet(this.id).subscribe((data) => {
        this.pet = data['animal'];
      });
    }
  }
}
