import { Component, OnInit, Input } from '@angular/core';
import { Pet } from 'src/app/models/Pet';

@Component({
  selector: 'app-pet-card',
  templateUrl: './pet-card.component.html',
  styleUrls: ['./pet-card.component.scss'],
})
export class PetCardComponent implements OnInit {
  @Input() pet: Pet;

  constructor() {}

  ngOnInit(): void {}
}
