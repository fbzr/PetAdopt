import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Pet } from 'src/app/models/Pet';
import { PetService } from 'src/app/services/pet.service';
import { OrganizationService } from 'src/app/services/organization.service';

@Component({
  selector: 'app-pet-details',
  templateUrl: './pet-details.component.html',
  styleUrls: ['./pet-details.component.scss'],
})
export class PetDetailsComponent implements OnInit {
  id: number;
  pet: Pet;
  organization: Object; // TODO: crete organization class

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private petService: PetService,
    private organizationService: OrganizationService
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

        this.organizationService
          .getOrganization(this.pet.organization_id)
          .subscribe((data) => {
            this.organization = data['organization'];
            console.log('organization data', this.organization);
          });
      });
    }
  }
}
