import { Component, OnInit } from '@angular/core';
import { Device } from '../Device-class';
import { DataService } from '../data.service';
import { MapMarker } from '@angular/google-maps';

declare let L: any; //neccesary for the map

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

/* PAY ATTENTION: In  dashboard.component.html, when you are using ngx charts, if you use "" the library will search
in this file the variable u other part of the code of this file, if you use '' you are using a creating a object
directly in the html (no accesing the code of this file), but you can create a object in the html 
that then uses the code of this file
*/

//This Part of the code will be like the "Object" that can be accesible in the dahsboard.component.html
export class DashboardComponent implements OnInit {
  public debug: any;
  private map: any;
  devices:  Device[] = []; //List of all devices
  currentDevice!: Device;  //Current device that was selected on the map

  startDate: string | null = null;
  endDate: string | null = null;

  constructor(private dataService: DataService) {  }

  ngOnInit() { //THE FUNCTION NGONINIT IS PREDEFINED AS A ANGULAR FUNCTION, SO IT WILL EXCECUTE AT THE BEGGINING EVEN IF YOU DON´T CALL THE FUNCTION
    //There are certain parts of the code that perfectly works here, but doesn´t works (give sinxis errors) outside this function
    this.getRealMeasurements();
    this.initMap();
    this.addMarkers();
  }

  filter() {
    if (this.startDate && this.endDate) {
      const start = new Date(this.startDate);
      const end = new Date(this.endDate);

      const filteredMeasurements = this.currentDevice.allMeasurements.map((measurement: any) => {
        return {
          ...measurement,
          measurementsValues: measurement.measurementsValues.filter((value: any) => {
            const date = new Date(value.name);
            return date >= start && date <= end;
          })
        };
      });
      this.currentDevice["allMeasurements"]= filteredMeasurements;

    } 
  }

  deleteFilters(){

  }

  calculateAverage(measurementsValues: any[]){
    let average: number=0;
    for (let i = 0; i < measurementsValues.length; i++) {
      average+= measurementsValues[i]["value"]
    }
    return average/measurementsValues.length

  }
  
  getRealMeasurements(){ //this function calls the service to  obtain the data
    this.devices= [] //Clean the devicesList to don´t repeat devices in case there exist devices already
    this.dataService.getMeasurementsData().subscribe(receiptDevices => {
      for (let i = 0; i < receiptDevices.length; i++) {
        this.devices.push(receiptDevices[i])
      }
    });
    this.currentDevice= this.devices[0];
  }

  MapOptions: google.maps.MapOptions = {   //Visual options of the google map
    mapId: "e87693c86192baae", //should be the same id that appears in google maps console
    center: { lat:40.428421, lng:-86.917492},
    zoom: 13,
  };

  public updateCurrentDevice(deviceClicked: any | null) { //This function is also called by the manual selector
    this.currentDevice= deviceClicked; //Update the current device, it implies that the voltage graphics and others are updated automatically too
    this.devices.forEach(device => device.icon = "http://maps.google.com/mapfiles/ms/icons/red-dot.png"); // this line change all the markets colors to red  
    deviceClicked.icon = 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'; // This change the color of the selected marker
  }

  onDeviceSelect(event: Event) {
    const target = event.target as HTMLSelectElement;
    const selectedDevice = this.devices.find(device => device.name === target.value);
    if (selectedDevice) {
      this.currentDevice=selectedDevice;
    }
  }

  private initMap(): void { //This function will init the open street view map (isn't for google maps)
    this.map = L.map('map', {
      center: [40.427421, -86.926492],
      zoom:12
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(this.map);

  }

  public addMarkers(): void {
    this.devices.forEach((device) => {
      let marker = L.marker([device.latitude, device.longitude]);
      marker.addTo(this.map)
        .on('click', () => this.updateCurrentDevice(device)); // this will update the device if the marker is clicked
    }); 
  }
}
