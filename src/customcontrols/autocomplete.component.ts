import { Component, AfterViewInit } from '@angular/core';
import { FieldType } from '@ngx-formly/material';
import { map, startWith, switchMap } from 'rxjs/operators';

import { Observable } from 'rxjs';

@Component({
  selector:'autoc',
  template: `
    <input matInput type="text"
     [matAutocomplete]="auto"
     [formControl]="formControl"
     [formlyAttributes]="field"
     [placeholder]="to.placeholder"
     [errorStateMatcher]="errorStateMatcher"
     (blur)="test()">
     <mat-autocomplete #auto="matAutocomplete"  [displayWith]="to.displayLabel">
            <mat-option *ngFor="let v of data | async" [value]="v" > 
                {{v.label}}
            </mat-option>
    </mat-autocomplete>
 `
})
export class AutocompleteComponent extends FieldType implements AfterViewInit {

  lastValue:any;
  data: Observable<any>;
  
  //ngAfterViewInit
  ngAfterViewInit() {
    super.ngAfterViewInit();
    this.data = this.formControl.valueChanges
      .pipe(
        startWith(''),
        switchMap(term => this.to.filter(term)),
      );
  }
  
  
test(){
  console.log('populate first option' );
}


  
}

