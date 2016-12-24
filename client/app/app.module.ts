import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }  from './app.component';
import { RestaurantsComponent } from './components/restaurants/restaurants.component'

@NgModule({
  imports:      [ BrowserModule ],
  declarations: [ AppComponent, RestaurantsComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }