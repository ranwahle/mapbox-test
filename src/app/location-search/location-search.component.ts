import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';

const MapblxGlApiUrl = 'https://api.mapbox.com'

@Component({
  selector: 'app-location-search',
  templateUrl: './location-search.component.html',
  styleUrls: ['./location-search.component.scss']
})
export class LocationSearchComponent implements AfterViewInit {

  @Input() accessToken: string = '';

  @Output() search = new EventEmitter<string>();
  @Output() centerFound = new EventEmitter<{lat: number, lng: number}>();

  constructor(private el: ElementRef) { }

  async onSearch(evt: Event) {
   const {value} = evt.target as HTMLInputElement;
   this.search.emit(value);
  }

  ngAfterViewInit(): void {

    const geoCoder = new MapboxGeocoder({
      accessToken: this.accessToken,
      types: 'country,region,place,postcode,locality,neighborhood'
    })

    geoCoder.addTo('#geocoder');

    geoCoder.on('result', result => {
      const [lng, lat] = result.result.center;
      const newCenter = {lat, lng}
      this.centerFound.emit(newCenter);
    });
    
   
  }

}
