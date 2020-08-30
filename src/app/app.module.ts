import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PetCardComponent } from './components/pages/home/pet-card/pet-card.component';
import { FeaturedPetsComponent } from './components/pages/home/featured-pets/featured-pets.component';
import { HomeComponent } from './components/pages/home/home.component';
import { AboutComponent } from './components/pages/about/about.component';
import { FooterComponent } from './components/footer/footer.component';
import { PetDetailsComponent } from './components/pages/pet-details/pet-details.component';
import { PetService } from './services/pet.service';
import { InitService } from './services/init.service';
import { DogsComponent } from './components/pages/dogs/dogs.component';
import { CatsComponent } from './components/pages/cats/cats.component';

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
    DogsComponent,
    CatsComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [
    PetService,
    InitService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [InitService],
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

export function initializeApp(initService: InitService) {
  return (): Promise<any> => initService.init();
}
