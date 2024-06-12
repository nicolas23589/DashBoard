import { Component, OnInit } from '@angular/core';
import { Device } from '../Device-class';

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
  //List of devices and current device
  devices:  Device[] = [];
  currentDevice!: Device;

  //###################################    HERE STARTS THE MAP STUFF   ##############################################

  //Visual options of the map
  MapOptions: google.maps.MapOptions = {
    mapId: "e87693c86192baae", //should be the same id that appears in google maps console
    center: { lat:40.428421, lng:-86.917492},
    zoom: 12,
  };

  onMarkerClick(deviceClicked: any) { 
    this.currentDevice= deviceClicked; //Update the current device, it implies that the voltage graphics and others are updated automatically too

    // this line change all the markets colors to red  
    this.devices.forEach(device => device.icon = "http://maps.google.com/mapfiles/ms/icons/red-dot.png");

    // This change the color of the selected marker
    deviceClicked.icon = 'http://maps.google.com/mapfiles/ms/icons/green-dot.png';
}

  
  //###################################    HERE FINISH THE MAP STUFF (AND STARTS THE GRAPHICS STUFF)   ##############################################


  ngOnInit() { //THE FUNCTION NGONINIT IS PREDEFINED AS A ANGULAR FUNCTION, SO IT WILL EXCECUTE AT THE BEGGINING EVEN IF YOU DON´T CALL THE FUNCTION

  this.devices.push(new Device( 
    1,  //ID
    40.42586,  //LATITUDE 
    -86.908066,  //LONGITUDE
    [{"value":5, "date": "01-01-2024"}], //VoltageMeasurement
    [{"value":20, "date": "01-01-2024"}], //CurrentMeasurement
    "http://maps.google.com/mapfiles/ms/icons/red-dot.png" //ICON IMAGE TO DISPLAY IN THE MAP
  ));
  this.devices.push(new Device(
    2,
    40.43586, 
    -86.918066,
    [{"value":30, "date": "01-01-2024"}],
    [{"value":40, "date": "01-01-2024"}],
    "http://maps.google.com/mapfiles/ms/icons/red-dot.png"  //ICON TO DISPLAY IN THE MAP
  ));

  this.currentDevice= this.devices[0];
  }

  //Necessary data for Historic Voltage, 
  HistoricVoltage: any[] = [
    {
      "name": "Voltage",
      "series": [
        {
          "name": "12:00",
          "value": 0
        },
        {
          "name": "13:00",
          "value": 3
        },
        {
          "name": "14:00",
          "value": 4
        },
        {
          "name": "15:00",
          "value": 2
        },
        {
          "name": "16:00",
          "value": 10
        }
      ]
    }
  ];

  HistoricCurrent: any[] = [
    {
      "name": "Current",
      "series": [
        {
          "name": "12:00",
          "value": 0
        },
        {
          "name": "13:00",
          "value": 13
        },
        {
          "name": "14:00",
          "value": 6
        },
        {
          "name": "15:00",
          "value": 10
        },
        {
          "name": "16:00",
          "value": 20
        }
      ]
    }
  ];
;

}
