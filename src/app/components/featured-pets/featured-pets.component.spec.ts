import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturedPetsComponent } from './featured-pets.component';

describe('FeaturedPetsComponent', () => {
  let component: FeaturedPetsComponent;
  let fixture: ComponentFixture<FeaturedPetsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeaturedPetsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeaturedPetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
