import { Component, OnInit } from '@angular/core';
import { PetService } from 'src/app/services/pet.service';
import { Pet } from 'src/app/models/Pet';

@Component({
  selector: 'app-cats',
  templateUrl: './cats.component.html',
  styleUrls: ['./cats.component.scss'],
})
export class CatsComponent implements OnInit {
  cats: Pet[];

  constructor(private petServices: PetService) {}

  ngOnInit(): void {
    if (!this.cats) {
      this.petServices.getPets({ type: 'Cat' }).subscribe((data) => {
        this.cats = data['animals'];
        console.log('Cats data: ', this.cats);
      });
    }
  }
}
