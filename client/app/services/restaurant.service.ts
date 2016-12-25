import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class RestaurantService{
    constructor(private http:Http){
        console.log('Restaurant Service Initialized...');
    }

    getRestaurants(){
        console.log('Service: Getting all restaurants');
        return this.http.get('http://localhost:3000/api/restaurants')
                    .map(res => res.json());
    }

    addRestaurant(newRestaurant: any){
        console.log('Service: Adding ' + newRestaurant.name);
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post('http://localhost:3000/api/restaurant', JSON.stringify(newRestaurant), {headers: headers})
            .map(res => res.json());
    }

    updateRestaurant(restaurant: any){
        console.log('Service: Updating ' + restaurant._id);

        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.put('/api/restaurant/' + restaurant._id, JSON.stringify(restaurant), {headers: headers})
            .map(res => res.json());
    }

    deleteRestaurant(id: any){
        console.log('Service: Deleting ' + id);
        return this.http.delete('/api/restaurant/' + id)
            .map(res => res.json());
    }
}