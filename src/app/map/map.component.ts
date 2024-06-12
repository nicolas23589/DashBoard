import { Component, OnInit } from '@angular/core';
import { SensorDataService } from '../sensor-data.service';
import { Device } from '../Device-class';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})


export class MapComponent  implements OnInit{
  
  devices: Device[] = [];

  ;

  constructor(private sensorDataService: SensorDataService) {} 

  ngOnInit(){
    
    this.sensorDataService.getDevices().subscribe(devices => {
      this.devices = devices;
    });
  };

   

    //Visual options of the map
    MapOptions: google.maps.MapOptions = {
    mapId: "e87693c86192baae",
    center: { lat:0, lng:0},
    zoom: 1,
  };

  /*
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
*/
  


  onMarkerClick(deviceClicked: any) {
    
    this.sensorDataService.updateCurrentDevice = deviceClicked;


    // this line change all the markets colors to red  
    this.devices.forEach(device => device.icon = "http://maps.google.com/mapfiles/ms/icons/red-dot.png");

    // This change the color of the selected marker
    deviceClicked.icon = 'http://maps.google.com/mapfiles/ms/icons/green-dot.png';
}

}
