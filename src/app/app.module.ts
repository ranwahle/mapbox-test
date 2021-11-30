import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MapTestComponentComponent } from './map-test-component/map-test-component.component';
import { FormsModule } from '@angular/forms';
import { LocationSearchComponent } from './location-search/location-search.component';

@NgModule({
  declarations: [
    AppComponent,
    MapTestComponentComponent,
    LocationSearchComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
