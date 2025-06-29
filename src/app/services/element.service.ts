import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PeriodicElement } from '../models/periodicElement'
import { lastValueFrom, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Element {

  constructor(private http: HttpClient) { }
  apiUrl = 'http://localhost:3000/perodicElement'
   getAll(){
    return this.http.get<PeriodicElement[]>(this.apiUrl)
  }
  getById(id: number) {
    return this.http.get<PeriodicElement>(this.apiUrl + "/" + id)
  }
  update(data: PeriodicElement) {
    return this.http.put(this.apiUrl + '/' + data.id, data);
  }
   
}
