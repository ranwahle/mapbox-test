import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MapTestComponentComponent } from './map-test-component/map-test-component.component';

@NgModule({
  declarations: [
    AppComponent,
    MapTestComponentComponent
  ],
  imports: [
    BrowserModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
