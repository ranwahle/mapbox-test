import {AfterViewInit, Component, ElementRef, Input, OnInit} from '@angular/core';
import mapboxgl, { Marker } from 'mapbox-gl';

import  {Map} from 'mapbox-gl';

export interface Coordinate {lat:number; lng: number;}

export type MapTypes = 'streets' | 'satelite';
const mapStylesDict: {[key in MapTypes]: string} = {
  streets: 'mapbox://styles/mapbox/streets-v11',
  satelite: '',
}

@Component({
  selector: 'app-map-test-component',
  templateUrl: './map-test-component.component.html',
  styleUrls: ['./map-test-component.component.scss']
})
export class MapTestComponentComponent implements OnInit, AfterViewInit {

  map: any;
  @Input() markerColor: string  ='#000000'
  @Input() center: Coordinate = {lat: 30.267966495765137,lng: 35};
  @Input() zoom: number = 19;
  @Input() mapType: MapTypes = 'streets';
  @Input() polygon: {
    name: string,
    coordinates: Coordinate[]
  } = {name: 'poly', coordinates: []}
  constructor(private el: ElementRef) {
  }


  @Input() markers: Coordinate[] = [];

  @Input() accessToken: string = '';

  ngOnInit(): void {

    mapboxgl.accessToken = this.accessToken;
    const map = new mapboxgl.Map({
      center: this.markers[0],
      zoom: this.zoom,
    container: 'map', // container ID
    style: mapStylesDict[this.mapType]

    });

    this.map = map;
    this.map.on('click', console.log);
    this.map.on('load', () => {
      this.markers.map(m => new Marker({color: this.markerColor, draggable: true }).setLngLat({lng: m.lng,lat: m.lat})).forEach(marker => {
        marker.addTo(this.map);
      });

      const {coordinates} = this.polygon;

      if (coordinates[0]?.lng !== coordinates[coordinates.length]?.lng ||
        coordinates[0]?.lat !== coordinates[coordinates.length]?.lat ) {
        coordinates.push({...coordinates[0]});
      }

      map.addSource(this.polygon.name, {
        type: 'geojson',
          data: {
          type: 'Feature',
            geometry: {
            type: 'Polygon',
              coordinates: [this.polygon.coordinates.map(c => [c.lng, c.lat])]
          },
            properties: {}

        }

      });

      // Add a new layer to visualize the polygon.
      map.addLayer({
        'id': this.polygon.name,
        'type': 'fill',
        'source': this.polygon.name, // reference the data source
        'layout': {},
        'paint': {
          'fill-color': '#0080ff', // blue color fill
          'fill-opacity': 0.5
        }
      });
// Add a black outline around the polygon.
      map.addLayer({
        'id': 'outline',
        'type': 'line',
        'source': this.polygon.name,
        'layout': {},
        'paint': {
          'line-color': '#000',
          'line-width': 3
        }
      });



      //



    })



  }

  ngAfterViewInit() {

  }

}
