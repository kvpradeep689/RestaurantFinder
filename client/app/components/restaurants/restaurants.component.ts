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
    
    constructor(private restaurantService:RestaurantService){
        this.restaurantService.getRestaurants()
            .subscribe(restaurants => {
                this.restaurants = restaurants;
            })
    }

    addRestaurant(event){
        event.preventDefault();
        //console.log(this.name);
        var newRestaurant = {
            name: this.name,
            description: this.description,
            city: this.city,
            state: this.state,
            cuisine: "Dummy cuisine",
            rating: this.rating
        }

        //this.restaurants.push(newRestaurant);
        this.restaurantService.addRestaurant(newRestaurant)
            .subscribe(restaurant => {
                this.restaurants.push(restaurant);
                this.name = '';
            })
    }
}
