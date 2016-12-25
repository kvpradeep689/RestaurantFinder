import { NgModule, CUSTOM_ELEMENTS_SCHEMA, Provider }  from '@angular/core';
import { AppComponent } from './app.component';
import { RestaurantsComponent } from './components/restaurants/restaurants.component';
import { RestaurantService } from './services/restaurant.service';
import { Observable } from 'rxjs/Rx';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

describe('AppComponent', function () {
  let de: DebugElement;
  let comp: AppComponent;
  //let restComp: RestaurantsComponent;
  //let resService: RestaurantService;
  let fixture: ComponentFixture<AppComponent>;
  //let restFixture: ComponentFixture<RestaurantsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ BrowserModule, FormsModule, HttpModule ],
      declarations: [ AppComponent, RestaurantsComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA  ],
      providers: [RestaurantService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    //restFixture = TestBed.createComponent(RestaurantsComponent);
    comp = fixture.componentInstance;
    //restComp = restFixture.componentInstance;
    de = fixture.debugElement.query(By.css('h1'));
  });

  it('should create component', () => expect(comp).toBeDefined() );

  it('should have expected header text', () => {
    fixture.detectChanges();
    console.log(de.nativeElement.innerText);
    const h1 = de.nativeElement;
    expect(h1.innerText).toMatch(/restaurants/i,
      '<h1> should say something about "Restaurants List"');
  });
});
