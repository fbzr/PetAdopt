import { Component, OnInit } from '@angular/core';
import { Pet } from '../../../../models/Pet';

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
        photos: [
          {
            medium:
              'https://images.unsplash.com/photo-1554173341-e3cfe8b0cbbf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80',
          },
        ],
      },
      {
        id: 2,
        name: 'Buckley',
        description: 'Crazy',
        photos: [
          {
            medium:
              'https://images.unsplash.com/photo-1453227588063-bb302b62f50b?ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80',
          },
        ],
      },
      {
        id: 3,
        name: 'Hendrix',
        description: 'Lazy and Hungry',
        photos: [
          {
            medium:
              'https://images.unsplash.com/photo-1455287278107-115faab3eafa?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=751&q=80',
          },
        ],
      },
    ];
  }
}
