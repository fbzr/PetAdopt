import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PetCardComponent } from './components/pages/home/pet-card/pet-card.component';
import { FeaturedPetsComponent } from './components/pages/home/featured-pets/featured-pets.component';
import { HomeComponent } from './components/pages/home/home.component';
import { AboutComponent } from './components/pages/about/about.component';
import { FooterComponent } from './components/footer/footer.component';
import { PetDetailsComponent } from './components/pages/pet-details/pet-details.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    PetCardComponent,
    FeaturedPetsComponent,
    HomeComponent,
    AboutComponent,
    FooterComponent,
    PetDetailsComponent,
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
