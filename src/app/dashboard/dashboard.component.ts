import { Component, ViewChild } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

//This Part of the code will be like the "Object" that can be accesible in the dahsboard.component.html
export class DashboardComponent {


  /*The following is the necessary data for every graphic, the most important is that every variable which have data-
   to be displayed needs to be type any[]*/

  //Necessary data for voltage
  VoltageValue: any[] = [
    {
      "name": "Voltage",
      "value": 10
    }];

    //TEMPORAL: this is an example of other device voltage

    VoltageValue1: any[] = [
      {
        "name": "Voltage",
        "value": 10
      }];

    VoltageValue2: any[] = [
      {
        "name": "Voltage",
        "value": 20
      }];

      if (selected_Device_Dashboard="Device 1") {
        this.VoltageValue= this.VoltageValue1;
      }  


  VoltageUnits: string = 'Volts';
  
  //Necessary data for Current
  CurrentValue: any[] = [
    {
      "name": "Current",
      "value": 40
    }];
  CurrentUnits: string = 'Ampers';

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
  xAxisLabel: string = 'Hour';
  yAxisLabel: string = 'Voltage';


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
  xAxisLabelCurrent: string = 'Hour';
  yAxisLabelCurrent: string = 'current';

}





