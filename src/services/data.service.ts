import { Injectable } from '@angular/core';
import { of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  getNations() {
    return of([
      { value: null, label: "------" },
      { value: 1, label: "Italy" },
      { value: 2, label: "Germany" },
      { value: 3, label: "Scotland" },
      { value: 4, label: "Egypt" },
      { value: 5, label: "France" },
      { value: 6, label: "England" },
      { value: 7, label: "Indonesia" },
      { value: 8, label: "Monaco" },
      { value: 9, label: "Malaysia" },
      { value: 10, label: "Malta" },
      { value: 11, label: "Mali" },
      { value: 12, label: "Malawi" }
    ]);
  }

  getCities(id: number = null) {
    return of([
      { value: null, label: '', nationId: null },
      { value: 1, label: "Rome", nationId: 1 },
      { value: 2, label: "Milan", nationId: 1 },
      { value: 3, label: "Berlin", nationId: 2 },
      { value: 4, label: "Glassgow", nationId: 3 },
      { value: 5, label: "Cairo", nationId: 4 },
      { value: 6, label: "Paris", nationId: 5 },
      { value: 7, label: "London", nationId: 6 },
      { value: 8, label: "Munich", nationId: 2 }
    ].filter(city => {
      if(id) {
        return city.nationId === id;
      } else {
        return true;
      }
    }));
  }
}
