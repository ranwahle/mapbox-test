import {Component} from '@angular/core';
import {Coordinate} from './map-test-component/map-test-component.component';
import {Marker} from 'mapbox-gl';
import {config} from '../../config/mapbox.js';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'mapbox-test';

  markers: Coordinate[] = [
    {
      lat: 30.043530553185832,
      lng: 35.04279213857268
    },
    {
      lat: 30.04369747875468,
      lng: 35.042879506510985
    },
    {
      lat: 30.04362708797018,
      lng: 35.04274567551883
    },{lat: 30.04356981741317,
      lng: 35.04272130551436}
  ]

  polygon = {
    name: 'polygotest',
    coordinates: [...this.markers]
  }

  accessToken = config.token;
}
