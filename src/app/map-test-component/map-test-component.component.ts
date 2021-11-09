import {AfterViewInit, Component, ElementRef, Input, OnInit} from '@angular/core';
import mapboxgl, { Marker } from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"

import  {Map} from 'mapbox-gl';

export interface Coordinate {lat:number; lng: number;}

@Component({
  selector: 'app-map-test-component',
  templateUrl: './map-test-component.component.html',
  styleUrls: ['./map-test-component.component.scss']
})
export class MapTestComponentComponent implements OnInit, AfterViewInit {

  map: any;
  @Input() markerColor: string  ='#000000'
  @Input() center: Coordinate = {lat: 35.5,lng: 36.5};
  @Input() zoom: number = 9;
  @Input() polygon: {
    name: string,
    coordinates: Coordinate[]
  } = {name: 'poly', coordinates: []}
  constructor(private el: ElementRef) {
  }


  @Input() markers: Coordinate[] = [];

  ngOnInit(): void {
    mapboxgl.accessToken = 'pk.eyJ1IjoicmFud2FobGUiLCJhIjoiY2t2MHYxaDFzMGk3dDJ1cGExbTc5NjV0NyJ9.iZ8DjuvhkCxtUNZ_bA6FAw';
    const map = new mapboxgl.Map({
      center: this.markers[0],// {lat: this.center.lat,lng: this.center.lng},
      zoom: this.zoom,
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/satellite-v9', // style URL

    });

    this.map = map;
    this.map.on('click', console.log);
    this.map.on('load', () => {
      this.markers.map(m => new Marker({color: this.markerColor, draggable: true }).setLngLat({lng: m.lng,lat: m.lat})).forEach(marker => {
        marker.addTo(this.map);
      });

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
