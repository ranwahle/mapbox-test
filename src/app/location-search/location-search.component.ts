import { Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';

const MapblxGlApiUrl = 'https://api.mapbox.com'

@Component({
  selector: 'app-location-search',
  templateUrl: './location-search.component.html',
  styleUrls: ['./location-search.component.scss']
})
export class LocationSearchComponent implements OnInit {

  @Input() accessToken: string = '';

  @Output() search = new EventEmitter<string>();

  constructor(private el: ElementRef) { }

  async onSearch(evt: Event) {
   const {value} = evt.target as HTMLInputElement;
   this.search.emit(value);
  }

  ngOnInit(): void {

   
  }

}
