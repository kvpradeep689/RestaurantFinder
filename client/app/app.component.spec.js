"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var core_1 = require('@angular/core');
var app_component_1 = require('./app.component');
var restaurants_component_1 = require('./components/restaurants/restaurants.component');
var restaurant_service_1 = require('./services/restaurant.service');
var Rx_1 = require('rxjs/Rx');
var forms_1 = require('@angular/forms');
var http_1 = require('@angular/http');
var platform_browser_1 = require('@angular/platform-browser');
var testing_1 = require('@angular/core/testing');
var platform_browser_2 = require('@angular/platform-browser');
describe('AppComponent', function () {
    var de;
    var fe;
    var deArray;
    var comp;
    //let restComp: RestaurantsComponent;
    //let resService: RestaurantService;
    var fixture;
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
    var MockRestaurantService = (function (_super) {
        __extends(MockRestaurantService, _super);
        function MockRestaurantService() {
            _super.call(this, null);
        }
        MockRestaurantService.prototype.getRestaurants = function () {
            console.log("Mock getRestaurants");
            return Rx_1.Observable.of(restaurantsData);
        };
        return MockRestaurantService;
    }(restaurant_service_1.RestaurantService));
    var MockRestaurantsComponent = (function (_super) {
        __extends(MockRestaurantsComponent, _super);
        function MockRestaurantsComponent() {
            _super.call(this, new MockRestaurantService());
        }
        return MockRestaurantsComponent;
    }(restaurants_component_1.RestaurantsComponent));
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [platform_browser_1.BrowserModule, forms_1.FormsModule, http_1.HttpModule],
            declarations: [app_component_1.AppComponent, MockRestaurantsComponent],
            schemas: [core_1.CUSTOM_ELEMENTS_SCHEMA],
            providers: [MockRestaurantService]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = testing_1.TestBed.createComponent(app_component_1.AppComponent);
        //restFixture = TestBed.createComponent(RestaurantsComponent);
        comp = fixture.componentInstance;
        //restComp = restFixture.componentInstance;
        de = fixture.debugElement;
    });
    it('should create component', function () { return expect(comp).toBeDefined(); });
    it('should have expected header text', function () {
        fixture.detectChanges();
        fe = de.query(platform_browser_2.By.css('h1'));
        //console.log(de.nativeElement.innerText);
        var h1 = fe.nativeElement;
        expect(h1.innerText).toMatch(/restaurants/i, '<h1> should say something about "Restaurants List"');
    });
    it('should have 3 restaurants listed', function () {
        fixture.detectChanges();
        deArray = de.queryAll(platform_browser_2.By.css('.row'));
        console.log(deArray);
        var h1 = deArray.length;
        expect(deArray.length).toMatch(/4/i, 'Grid should have three Restaurants (four rows including header)');
    });
    /* it('should delete restaurant on delete button click', () => {
       fixture.detectChanges();
       deArray = de.queryAll(By.css('.row'));
       console.log(deArray);
       const h1 = deArray.length;
       expect(deArray.length).toMatch(/4/i,
         'Grid should have three Restaurants (four rows including header)');
     }); */
});
//# sourceMappingURL=app.component.spec.js.map