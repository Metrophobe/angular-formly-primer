import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from '../app/app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { AutocompleteComponent } from 'src/customcontrols/autocomplete.component';


@NgModule({
  declarations: [
    AppComponent, 
    AutocompleteComponent
  ],
  imports: [
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatToolbarModule,
    MatInputModule, 
    MatAutocompleteModule,
    BrowserModule,
    AppRoutingModule,
    FormlyModule.forRoot({
      types: [{
        name: 'autocomplete',
        component: AutocompleteComponent,
        wrappers: ['form-field'],
      }],
      extras: {
        lazyRender: true
      }
    }),
    FormlyMaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
