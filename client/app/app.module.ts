import { NgModule, CUSTOM_ELEMENTS_SCHEMA  }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { AppComponent }  from './app.component';
import { RestaurantsComponent } from './components/restaurants/restaurants.component'

@NgModule({
  imports:      [ BrowserModule, HttpModule, FormsModule ],
  declarations: [ AppComponent, RestaurantsComponent ],
  bootstrap:    [ AppComponent ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA  ]
})
export class AppModule { }