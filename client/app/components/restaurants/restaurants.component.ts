import { Component } from '@angular/core';
import { RestaurantService } from '../../services/restaurant.service';
import { Restaurant } from '../../../restaurant';

@Component({
  moduleId: module.id,
  selector: 'restaurants',
  //templateUrl: `restaurants.component.html`,
  templateUrl: 'restaurants.component.html',
})

export class RestaurantsComponent  {
    restaurants: Restaurant[];
    public currentRestaurant = {
        _id: "",
        name: "",
        description: "",
        city: "",
        state: "",
        cuisine: "",
        rating: 0,
    }
    error: string;
    isAdd: boolean;
    addUpdate: string;

    constructor(private restaurantService:RestaurantService){
        this.restaurantService.getRestaurants()
            .subscribe(restaurants => {
                this.restaurants = restaurants;
            }, error => {
                this.displayErrors(error);
            })
          this.isAdd = true;
          this.addUpdate = "Add";
          this.currentRestaurant.rating = null;
    }

    addRestaurant(event: any){
        event.preventDefault();
        //console.log(this.name);
        //this.restaurants.push(newRestaurant);
        if(this.isAdd) {
            this.restaurantService.addRestaurant(this.currentRestaurant)
                .subscribe(restaurant => {
                    this.restaurants.push(restaurant);
                    this.isAdd = true;
                    this.error = "";
                    console.log("Added...reset UI now");
                    this.currentRestaurant = {
                                                _id: "",
                                                name: "",
                                                description: "",
                                                city: "",
                                                state: "",
                                                cuisine: "",
                                                rating: null,
                                            };
               }, error => {
                    this.displayErrors(error);
                })
        }
        else
        {
            this.updateRestaurant(this.currentRestaurant);
        }
    }

    editRestaurant(id: any){
        console.log(this.isAdd);
        console.log(id);
        var restaurants = this.restaurants;
        for(var i = 0; i < restaurants.length; i++){
            if(restaurants[i]._id == id){
                this.currentRestaurant = restaurants[i];
                this.isAdd = false;
                this.addUpdate = "Update";
            }
        }

    }

    updateRestaurant(restaurant: any){
        //console.log(this.name);
        console.log("in update" + restaurant._id);
        this.restaurantService.updateRestaurant(restaurant)
            .subscribe(data => {
                this.error = "";
                this.isAdd = true;
                this.addUpdate = "Add";
                this.currentRestaurant = {
                                            _id: "",
                                            name: "",
                                            description: "",
                                            city: "",
                                            state: "",
                                            cuisine: "",
                                            rating: null,
                                        };
            }, error => {
                this.displayErrors(error);
            })
    }

    deleteRestaurant(id: any){
        var restaurants = this.restaurants;
        this.restaurantService.deleteRestaurant(id)
            .subscribe(data => {
                if(data.n == 1){
                    for(var i = 0; i < restaurants.length; i++){
                        if(restaurants[i]._id == id){
                            restaurants.splice(i, 1);
                        }
                    }
                }
                this.error = "";
            }, error => {
                this.displayErrors(error);
            })
    }

    displayErrors(error: any) {
        console.log(error);
        this.error = error._body;
   }
}
