export class Restaurant{
    _id: string;
    name: string;
    description: string;
    city: string;
    state: string;
    cuisine: string;
    rating: number;

    defaults() = function {
        this.name = '';
        this.description = '';
        this.city = '';
        this.state = '';
        this.cuisine = '';
        this.rating = null;
        this.error = "";
    };
}