import { Component, OnInit } from '@angular/core';
import { Device } from '../Device-class';

declare let L: any;

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

  private map: any;
  constructor() {}

  //Receipt data test (temporal)

  devices:  Device[] = []; //List of all devices
  currentDevice!: Device;  //Current device that was selected on the map

  //###################################    HERE STARTS THE MAP STUFF   ##############################################

  //Visual options of the map
  MapOptions: google.maps.MapOptions = {
    mapId: "e87693c86192baae", //should be the same id that appears in google maps console
    center: { lat:40.428421, lng:-86.917492},
    zoom: 12,
  };


  updateCurrentDevice(deviceClicked: any) { 
    this.currentDevice= deviceClicked; //Update the current device, it implies that the voltage graphics and others are updated automatically too

    // this line change all the markets colors to red  
    this.devices.forEach(device => device.icon = "http://maps.google.com/mapfiles/ms/icons/red-dot.png");

    // This change the color of the selected marker
    deviceClicked.icon = 'http://maps.google.com/mapfiles/ms/icons/green-dot.png';
  }
  //###################################    HERE FINISH THE MAP STUFF (AND STARTS THE GRAPHICS STUFF)   ##############################################



  ngOnInit() { //THE FUNCTION NGONINIT IS PREDEFINED AS A ANGULAR FUNCTION, SO IT WILL EXCECUTE AT THE BEGGINING EVEN IF YOU DON´T CALL THE FUNCTION
    
    this.initMap();

    //There are certain parts of the code that perfectly works here, but doesn´t works (give sinxis errors) outside this function

    this.devices.push(new Device( //ADDING ANOTHER DEVICE
      1, "Device 1", 40.43586, -86.918066,
      [ //VOLTAGE MEASUREMENTS
        {
          "name": "Voltage",
          "series": [
            {
              "name": "13:00",
              "value": 10
            },
            {
              "name": "10:00",
              "value": 5
            }
          ]
        }
      ],
      [ //Current MEASUREMENTS
        {
          "name": "Current",
          "series": [
            {
              "name": "13:00",
              "value": 3
            },
            {
              "name": "10:00",
              "value": 5
            }
          ]
        }
      ],
      "http://maps.google.com/mapfiles/ms/icons/red-dot.png"  
    ));

  this.devices.push(new Device( //ADDING ANOTHER DEVICE
    2, "Device 2",40.44586, -86.928066,
    [ //VOLTAGE MEASUREMENTS
      {
        "name": "Voltage",
        "series": [
          {
            "name": "13:00",
            "value": 3
          },
          {
            "name": "10:00",
            "value": 10
          }
        ]
      }
    ],
    [ //Current MEASUREMENTS
      {
        "name": "Current",
        "series": [
          {
            "name": "13:00",
            "value": 10
          },
          {
            "name": "10:00",
            "value": 3
          }
        ]
      }
    ],
    "http://maps.google.com/mapfiles/ms/icons/red-dot.png"  
  ));

  this.currentDevice= this.devices[0];

  }

  private initMap(): void {
    this.map = L.map('map', {
      center: [51.505, -0.09],
      zoom: 13
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(this.map);
  }

}
