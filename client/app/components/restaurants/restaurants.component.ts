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
        //Get restaurants
        this.restaurantService.getRestaurants()
            .subscribe(restaurants => {
                this.restaurants = restaurants;
            }, error => {
                this.displayErrors(error);
            })
          this.isAdd = true;
          this.addUpdate = "Add";
    }

    //Add the restaurant
    addRestaurant(event: any){
        event.preventDefault();
        //console.log(this.name);
        /*
        //Get the rating from the dropdown and update the restaurant object
        var getSelectedId = document.getElementById('selectedRating');
        console.log(getSelectedId);
        this.currentRestaurant.rating = getSelectedId.options[getSelectedId.selectedIndex].value;
        */
        //Check if add or update
        if(this.isAdd) {
            //Initiate the service call to add restaurant
            this.restaurantService.addRestaurant(this.currentRestaurant)
                .subscribe(restaurant => {
                    this.restaurants.push(restaurant);
                    this.isAdd = true;
                    this.error = "";
                    console.log("Added restaurant...reset UI now");
                    this.currentRestaurant = {
                                                _id: "",
                                                name: "",
                                                description: "",
                                                city: "",
                                                state: "",
                                                cuisine: "",
                                                rating: 0,
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

    //Edit the existing restaurant. Use the same fields and binding which are there to add restaurant
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

    //Update the existing restaurant to the database
    updateRestaurant(restaurant: any){
        //console.log(this.name);
        console.log("In update " + restaurant._id);
        this.restaurantService.updateRestaurant(restaurant)
            .subscribe(data => {
                //Update success. Reset all fields
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
                                            rating: 0,
                                        };
            }, error => {
                this.displayErrors(error);
            })
    }

    //Deleting a single restaurant
    deleteRestaurant(id: any){
        var restaurants = this.restaurants;
        this.restaurantService.deleteRestaurant(id)
            .subscribe(data => {
                if(data.n == 1){
                    //Database delete is a success. So loop through the existing items list and delete it.
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

    //Display the errors to the UI
    displayErrors(error: any) {
        console.log(error);
        this.error = error._body;
    }

    changeRating(value: number){
        console.log(value);
        this.currentRestaurant.rating=value;
    }
}
