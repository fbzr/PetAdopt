import { Component, OnInit } from '@angular/core';
import { Pet } from '../../models/Pet';

@Component({
  selector: 'app-featured-pets',
  templateUrl: './featured-pets.component.html',
  styleUrls: ['./featured-pets.component.scss'],
})
export class FeaturedPetsComponent implements OnInit {
  pets: Pet[];

  constructor() {}

  ngOnInit(): void {
    this.pets = [
      {
        id: 1,
        name: 'Petisco',
        description: 'Sweet',
      },
      {
        id: 2,
        name: 'Buckley',
        description: 'Crazy',
        photos: [
          {
            medium:
              'https://cdn.pixabay.com/photo/2015/06/08/15/02/pug-801826_960_720.jpg',
          },
        ],
      },
      {
        id: 3,
        name: 'Hendrix',
        description: 'Lazy',
      },
    ];
  }
}
