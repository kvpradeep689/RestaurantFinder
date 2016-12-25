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
    name: string;
    description: string;
    city: string;
    state: string;
    cuisine: string;
    rating: number;
    
    error: string;

    constructor(private restaurantService:RestaurantService){
        this.restaurantService.getRestaurants()
            .subscribe(restaurants => {
                this.restaurants = restaurants;
            }, error => {
                this.displayErrors(error);
            })
    }

    addRestaurant(event: any){
        event.preventDefault();
        //console.log(this.name);
        var newRestaurant = {
            name: this.name,
            description: this.description,
            city: this.city,
            state: this.state,
            cuisine: this.cuisine,
            rating: this.rating
        }

        //this.restaurants.push(newRestaurant);
        this.restaurantService.addRestaurant(newRestaurant)
            .subscribe(restaurant => {
                this.restaurants.push(restaurant);
                this.name = '';
                this.description = '';
                this.city = '';
                this.state = '';
                this.cuisine = '';
                this.rating = null;
                this.error = "";
            }, error => {
                this.displayErrors(error);
            })
    }

    updateRestaurant(restaurant: any){
        event.preventDefault();
        //console.log(this.name);
        var updRestaurant = {
            name: restaurant.name,
            description: restaurant.description,
            city: restaurant.city,
            state: restaurant.state,
            cuisine: restaurant.cuisine,
            rating: restaurant.rating
        }

        this.restaurantService.updateRestaurant(updRestaurant)
            .subscribe(data => {
                this.error = "";
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
