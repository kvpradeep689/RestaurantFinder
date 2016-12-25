"use strict";
var core_1 = require('@angular/core');
var app_component_1 = require('./app.component');
var restaurants_component_1 = require('./components/restaurants/restaurants.component');
var restaurant_service_1 = require('./services/restaurant.service');
var forms_1 = require('@angular/forms');
var http_1 = require('@angular/http');
var platform_browser_1 = require('@angular/platform-browser');
var testing_1 = require('@angular/core/testing');
var platform_browser_2 = require('@angular/platform-browser');
describe('AppComponent', function () {
    var de;
    var comp;
    //let restComp: RestaurantsComponent;
    //let resService: RestaurantService;
    var fixture;
    //let restFixture: ComponentFixture<RestaurantsComponent>;
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [platform_browser_1.BrowserModule, forms_1.FormsModule, http_1.HttpModule],
            declarations: [app_component_1.AppComponent, restaurants_component_1.RestaurantsComponent],
            schemas: [core_1.CUSTOM_ELEMENTS_SCHEMA],
            providers: [restaurant_service_1.RestaurantService]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = testing_1.TestBed.createComponent(app_component_1.AppComponent);
        //restFixture = TestBed.createComponent(RestaurantsComponent);
        comp = fixture.componentInstance;
        //restComp = restFixture.componentInstance;
        de = fixture.debugElement.query(platform_browser_2.By.css('h1'));
    });
    it('should create component', function () { return expect(comp).toBeDefined(); });
    it('should have expected header text', function () {
        fixture.detectChanges();
        console.log(de.nativeElement.innerText);
        var h1 = de.nativeElement;
        expect(h1.innerText).toMatch(/restaurants/i, '<h1> should say something about "Restaurants List"');
    });
});
//# sourceMappingURL=app.component.spec.js.map