import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { GoogleMapsModule } from "@angular/google-maps";


import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MapComponent } from './map/map.component';

@NgModule({
  declarations: [	
    AppComponent,
    DashboardComponent,
    MapComponent
   ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgxChartsModule,
    MatCardModule ,
    GoogleMapsModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
