"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var restaurant_service_1 = require('../../services/restaurant.service');
var RestaurantsComponent = (function () {
    function RestaurantsComponent(restaurantService) {
        var _this = this;
        this.restaurantService = restaurantService;
        this.restaurantService.getRestaurants()
            .subscribe(function (restaurants) {
            _this.restaurants = restaurants;
        }, function (error) {
            _this.displayErrors(error);
        });
    }
    RestaurantsComponent.prototype.addRestaurant = function (event) {
        var _this = this;
        event.preventDefault();
        //console.log(this.name);
        var newRestaurant = {
            name: this.name,
            description: this.description,
            city: this.city,
            state: this.state,
            cuisine: this.cuisine,
            rating: this.rating
        };
        //this.restaurants.push(newRestaurant);
        this.restaurantService.addRestaurant(newRestaurant)
            .subscribe(function (restaurant) {
            _this.restaurants.push(restaurant);
            _this.name = '';
            _this.description = '';
            _this.city = '';
            _this.state = '';
            _this.cuisine = '';
            _this.rating = null;
            _this.error = "";
        }, function (error) {
            _this.displayErrors(error);
        });
    };
    RestaurantsComponent.prototype.updateRestaurant = function (restaurant) {
        var _this = this;
        event.preventDefault();
        //console.log(this.name);
        var updRestaurant = {
            name: restaurant.name,
            description: restaurant.description,
            city: restaurant.city,
            state: restaurant.state,
            cuisine: restaurant.cuisine,
            rating: restaurant.rating
        };
        this.restaurantService.updateRestaurant(updRestaurant)
            .subscribe(function (data) {
            _this.error = "";
        }, function (error) {
            _this.displayErrors(error);
        });
    };
    RestaurantsComponent.prototype.deleteRestaurant = function (id) {
        var _this = this;
        var restaurants = this.restaurants;
        this.restaurantService.deleteRestaurant(id)
            .subscribe(function (data) {
            if (data.n == 1) {
                for (var i = 0; i < restaurants.length; i++) {
                    if (restaurants[i]._id == id) {
                        restaurants.splice(i, 1);
                    }
                }
            }
            _this.error = "";
        }, function (error) {
            _this.displayErrors(error);
        });
    };
    RestaurantsComponent.prototype.displayErrors = function (error) {
        console.log(error);
        this.error = error._body;
    };
    RestaurantsComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'restaurants',
            //templateUrl: `restaurants.component.html`,
            templateUrl: 'restaurants.component.html',
        }), 
        __metadata('design:paramtypes', [restaurant_service_1.RestaurantService])
    ], RestaurantsComponent);
    return RestaurantsComponent;
}());
exports.RestaurantsComponent = RestaurantsComponent;
//# sourceMappingURL=restaurants.component.js.map