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
    // NgxMapboxGLModule.withConfig({
    //   accessToken: 'pk.eyJ1IjoicmFud2FobGUiLCJhIjoiY2t2MHYxaDFzMGk3dDJ1cGExbTc5NjV0NyJ9.iZ8DjuvhkCxtUNZ_bA6FAw', // Optional, can also be set per map (accessToken input of mgl-map)
    //   geocoderAccessToken: 'pk.eyJ1IjoicmFud2FobGUiLCJhIjoiY2t2MHYxaDFzMGk3dDJ1cGExbTc5NjV0NyJ9.iZ8DjuvhkCxtUNZ_bA6FAw' // Optional, specify if different from the map access token, can also be set per mgl-geocoder (accessToken input of mgl-geocoder)
    // })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
