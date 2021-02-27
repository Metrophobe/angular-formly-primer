import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  getNations(){
    return of([
      {value:1, label:"Italy"},
      {value:2, label:"Germany"},
      {value:3, label:"Scotland"},
      {value:4, label:"Egypt"},
      {value:5, label:"France"},
      {value:6, label:"England"}

    ]);
  }
}
