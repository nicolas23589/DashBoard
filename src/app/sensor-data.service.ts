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
