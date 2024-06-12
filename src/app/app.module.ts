import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { MatCardModule } from '@angular/material/card';
import { GoogleMapsModule } from "@angular/google-maps";


import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { DashboardComponent } from './dashboard/dashboard.component';


@NgModule({
  declarations: [	
    AppComponent,
    DashboardComponent
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
