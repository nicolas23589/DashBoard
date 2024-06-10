import { Component } from '@angular/core';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent  {
    //Visual options of the map
    MapOptions: google.maps.MapOptions = {
    mapId: "e87693c86192baae",
    center: { lat: -34.397, lng: 150.644 },
    zoom: 8,
  };

  markers = [
    {
      position: { lat: -34.397, lng: 150.644 },
      title:"Device 1",
      icon: "http://maps.google.com/mapfiles/ms/icons/red-dot.png"
    },
    {
      position: { lat: -34.497, lng: 150.744 },
      title: "Device 2",
      icon: "http://maps.google.com/mapfiles/ms/icons/red-dot.png"
    }
  ];

  
  selectedDevice: string= "Device 1";

  onMarkerClick(marker: any) {
    
    this.selectedDevice = marker.title;


    // this line change all the markets colors to red  
    this.markers.forEach(m => m.icon = "http://maps.google.com/mapfiles/ms/icons/red-dot.png");

    // This change the color of the selected marker
    marker.icon = 'http://maps.google.com/mapfiles/ms/icons/green-dot.png';
}

}
