import { Injectable, OnInit } from '@angular/core';
import { Device } from './Device-class';
import { Measurement } from './Measurement-class';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SensorDataService {

  constructor() { }

  devices:  Device[] = [];
  currentDevice: Device | undefined ;
  

  ngOnInit() {

    this.devices.push(new Device( 
      1,  //ID
      0,  //LATITUDE 
      0,  //LONGITUDE
      [new Measurement(new Date(), 5.0)],
      [new Measurement(new Date(), 1.2)],
      "http://maps.google.com/mapfiles/ms/icons/red-dot.png" //ICON TO DISPLAY IN THE MAP
    ));
    this.devices.push(new Device(
      2,
      34.0522, 
      -118.2437,
      [new Measurement(new Date(), 4.5)],
      [new Measurement(new Date(), 0.9)],
      "http://maps.google.com/mapfiles/ms/icons/red-dot.png"  //ICON TO DISPLAY IN THE MAP
    ));

    this.currentDevice = this.devices[0];

  }

  getCurrentDevice(): Device | undefined {
    return this.currentDevice;
  }

  getDevices(): Observable<Device[]> {
    return of(this.devices);
  }

  updateCurrentDevice(deviceParameter: Device){
    this.currentDevice= deviceParameter;

  }
}
