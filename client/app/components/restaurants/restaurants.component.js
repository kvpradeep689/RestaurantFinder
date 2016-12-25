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
        this.currentRestaurant = {
            _id: "",
            name: "",
            description: "",
            city: "",
            state: "",
            cuisine: "",
            rating: 0,
        };
        this.restaurantService.getRestaurants()
            .subscribe(function (restaurants) {
            _this.restaurants = restaurants;
        }, function (error) {
            _this.displayErrors(error);
        });
        this.isAdd = true;
        this.addUpdate = "Add";
        this.currentRestaurant.rating = null;
    }
    RestaurantsComponent.prototype.addRestaurant = function (event) {
        var _this = this;
        event.preventDefault();
        //console.log(this.name);
        //this.restaurants.push(newRestaurant);
        if (this.isAdd) {
            this.restaurantService.addRestaurant(this.currentRestaurant)
                .subscribe(function (restaurant) {
                _this.restaurants.push(restaurant);
                _this.isAdd = true;
                _this.error = "";
                console.log("Added...reset UI now");
                _this.currentRestaurant = {
                    _id: "",
                    name: "",
                    description: "",
                    city: "",
                    state: "",
                    cuisine: "",
                    rating: null,
                };
            }, function (error) {
                _this.displayErrors(error);
            });
        }
        else {
            this.updateRestaurant(this.currentRestaurant);
        }
    };
    RestaurantsComponent.prototype.editRestaurant = function (id) {
        console.log(this.isAdd);
        console.log(id);
        var restaurants = this.restaurants;
        for (var i = 0; i < restaurants.length; i++) {
            if (restaurants[i]._id == id) {
                this.currentRestaurant = restaurants[i];
                this.isAdd = false;
                this.addUpdate = "Update";
            }
        }
    };
    RestaurantsComponent.prototype.updateRestaurant = function (restaurant) {
        var _this = this;
        //console.log(this.name);
        console.log("in update" + restaurant._id);
        this.restaurantService.updateRestaurant(restaurant)
            .subscribe(function (data) {
            _this.error = "";
            _this.isAdd = true;
            _this.addUpdate = "Add";
            _this.currentRestaurant = {
                _id: "",
                name: "",
                description: "",
                city: "",
                state: "",
                cuisine: "",
                rating: null,
            };
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