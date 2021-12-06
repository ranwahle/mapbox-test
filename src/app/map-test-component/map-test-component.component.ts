import {AfterViewInit, Component, ElementRef, Input, OnInit} from '@angular/core';
import mapboxgl, { Marker } from 'mapbox-gl';
import MapboxDraw from "@mapbox/mapbox-gl-draw";

import  {Map} from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';

export interface Coordinate {lat:number; lng: number;}

export type MapTypes = 'streets' | 'satellite';
const mapStylesDict: {[key in MapTypes]: string} = {
  streets: 'mapbox://styles/mapbox/streets-v11',
  satellite: 'mapbox://styles/mapbox/satellite-v9',
}

@Component({
  selector: 'app-map-test-component',
  templateUrl: './map-test-component.component.html',
  styleUrls: ['./map-test-component.component.scss']
})
export class MapTestComponentComponent implements OnInit, AfterViewInit {

  map: Map | null = null;
  @Input() markerColor: string  ='#000000'
  private _center: Coordinate = {lat: 30.267966495765137,lng: 35};
  get center(): Coordinate {
    return this._center;
  }


  @Input() set center(value) {
    this._center = value;
    this.map?.setCenter(value);
  } 
  @Input() zoom: number = 19;
  @Input() mapType: MapTypes = 'streets';


  @Input() set search(value: string) {
    this.geoCoder?.setInput(value);
  }

  @Input() polygon: {
    name: string,
    coordinates: Coordinate[]
  } = {name: 'poly', coordinates: []}
  geoCoder: MapboxGeocoder | undefined;
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

    this.geoCoder = new MapboxGeocoder({
      accessToken: this.accessToken,
      mapboxgl: this.map
    }) 

    this.geoCoder.on('loading', (evt) => {
      console.log('input', evt);
    })

    map.addControl(this.geoCoder);
    this.map.on('click', console.log);
    this.map.on('load', () => {
      this.markers.map(m => new Marker({color: this.markerColor, draggable: true }).setLngLat({lng: m.lng,lat: m.lat})).forEach(marker => {
        marker.addTo(this.map as Map);
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


      const draw = new MapboxDraw({
        displayControlsDefault: false,
// Select which mapbox-gl-draw control buttons to add to the map.
        controls: {
          polygon: true,
          trash: true
        },
// Set mapbox-gl-draw to draw by default.
// The user does not have to click the polygon control button first.
        defaultMode: 'draw_polygon'
      });
      map.addControl(draw);


      //



    })



  }

  ngAfterViewInit() {

  }

}
