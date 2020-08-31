import { Component, OnInit } from '@angular/core';
import { Pet } from 'src/app/models/Pet';
import { PetService } from 'src/app/services/pet.service';

@Component({
  selector: 'app-dogs',
  templateUrl: './dogs.component.html',
  styleUrls: ['./dogs.component.scss'],
})
export class DogsComponent implements OnInit {
  dogs: Pet[];

  constructor(private petService: PetService) {}

  ngOnInit(): void {
    if (!this.dogs) {
      this.petService.getPets({ type: 'Dog' }).subscribe((data) => {
        this.dogs = data['animals'];
        console.log('Dogs data: ', this.dogs);
      });
    }
  }
}
