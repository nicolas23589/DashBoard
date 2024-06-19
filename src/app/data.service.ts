import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Device } from './Device-class';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private jsonUrl ='http://127.0.0.1:5000/api';

  constructor(private http: HttpClient) { }

  getMeasurementsData(): Observable<Device[]> {
    return this.http.get<Device[]>(this.jsonUrl);
  }
}
