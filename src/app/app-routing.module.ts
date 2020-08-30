import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/pages/home/home.component';
import { AboutComponent } from './components/pages/about/about.component';
import { PetDetailsComponent } from './components/pages/pet-details/pet-details.component';
import { DogsComponent } from './components/pages/dogs/dogs.component';
import { CatsComponent } from './components/pages/cats/cats.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'pet/:id', component: PetDetailsComponent },
  { path: 'dogs', component: DogsComponent },
  { path: 'cats', component: CatsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
