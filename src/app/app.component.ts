import {Component} from '@angular/core';
import { Coordinate } from './map-test-component/map-test-component.component';
import  {Marker} from 'mapbox-gl';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'mapbox-test';

  markers: Coordinate[] = [
    {lat: 30.5, lng: 34.5},
    {lat: 30.2, lng: 35.5}
  ]

  polygon = {name: 'polygotest',
    coordinates: [...this.markers, {lat: 30, lng: 35}]
  }
}
