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
import { Restaurant } from '../restaurant';

describe('AppComponent', function () {
  let de: DebugElement;
  let fe: DebugElement;
  let deArray: DebugElement[];
  let comp: AppComponent;
  //let restComp: RestaurantsComponent;
  //let resService: RestaurantService;
  let fixture: ComponentFixture<AppComponent>;
  //let restFixture: ComponentFixture<RestaurantsComponent>;

  var restaurantsData = [
            {
                "_id": "1",
                "name": "McDonalds",
                "description": "Fast food chain",
                "city": "Charleston",
                "state": "South Carolina",
                "cuisine": "American",
                "rating": 4
            },
            {
                 "_id": "2",
                "name": "Olive Garden",
                "description": "Dine in Italian restaurant",
                "city": "Charleston",
                "state": "South Carolina",
                "cuisine": "Italian",
                "rating": 4
            },
            {
                 "_id": "3",
                "name": "Andolinis",
                "description": "Pizza restaurant",
                "city": "Charleston",
                "state": "South Carolina",
                "cuisine": "Italian",
                "rating": 3
            }
        ];
  class MockRestaurantService extends RestaurantService {
    constructor() {
        super(null);
    }

    getRestaurants() {
        console.log("Mock getRestaurants");
        return Observable.of(restaurantsData);
    }
/*
    addRestaurant(newRestaurant: Restaurant){
        console.log("Mock addRestaurant");
        return restaurantsData.push(JSON.stringify(newRestaurant));
    }

    updateRestaurant(restaurant: Restaurant){
        console.log("Mock updateRestaurant");
        return restaurantsData;
    }
*/
    deleteRestaurant(id: any){
        console.log("Mock deleteRestaurant");
        for(var i = 0; i < restaurantsData.length; i++){
                        if(restaurantsData[i]._id == id){
                            restaurantsData.splice(i, 1);
                        }
                    }
        console.log(restaurantsData);
          
        return Observable.of(restaurantsData);
    } 
  }

  class MockRestaurantsComponent extends RestaurantsComponent {
    constructor() {
        super(new MockRestaurantService());
    }
  }
  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ BrowserModule, FormsModule, HttpModule ],
      declarations: [ AppComponent, MockRestaurantsComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA  ],
      providers: [MockRestaurantService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    //restFixture = TestBed.createComponent(RestaurantsComponent);
    comp = fixture.componentInstance;
    //restComp = restFixture.componentInstance;
    de = fixture.debugElement;
  });

  it('should create component', () => expect(comp).toBeDefined() );

  it('should have expected header text', () => {
    fixture.detectChanges();
    fe = de.query(By.css('h1'));
    //console.log(de.nativeElement.innerText);
    const h1 = fe.nativeElement;
    expect(h1.innerText).toMatch(/restaurants/i,
      '<h1> should say something about "Restaurants List"');
  });

  it('should have 3 restaurants listed', () => {
    fixture.detectChanges();
    deArray = de.queryAll(By.css('.row'));
    console.log(deArray);
    const h1 = deArray.length;
    expect(deArray.length).toMatch(/4/i,
      'Grid should have three Restaurants (four rows including header)');
  });

  it('should delete restaurant on delete button click', () => {
    fixture.detectChanges();
    fe = de.query(By.css('.btn-danger'));
    fe.nativeElement.click();
    //fixture = TestBed.createComponent(AppComponent);
    //comp = fixture.componentInstance;
    //de = fixture.debugElement;
    deArray = de.queryAll(By.css('.btn-danger'));
    console.log(deArray);
    const h1 = deArray.length;
    expect(deArray.length).toMatch(/2/i, 'Grid should have two Restaurants)');
  });
});
