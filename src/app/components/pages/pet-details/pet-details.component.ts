import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Pet } from 'src/app/models/Pet';

@Component({
  selector: 'app-pet-details',
  templateUrl: './pet-details.component.html',
  styleUrls: ['./pet-details.component.scss'],
})
export class PetDetailsComponent implements OnInit {
  pet: Pet;
  id: number;

  constructor(private route: ActivatedRoute, private router: Router) {
    this.pet = this.router.getCurrentNavigation().extras.state.pet;
    console.log(this.pet);
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
    });
  }
}
