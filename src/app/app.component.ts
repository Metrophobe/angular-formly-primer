import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { DataService } from 'src/services/data.service';
import { startWith, switchMap } from 'rxjs/operators';

import { of } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  nations = [];


  title = 'Ex3 - Autocomplete';

  //Form Essentials
  firstForm: FormGroup;
  model: any;
  fields: FormlyFieldConfig[];

  //Initialisation of Model and Fields 
  init() {
    this.firstForm = new FormGroup({});
    //The model that the fields are bound to 
    this.model = {
      id: '123456',
      firstName: 'Metrophobe',
      age: 34,
      countryAutocomplete: {},
      email: '123@google.com',
      nationId: 2,
      cityId: 8
    };

    //The various properties of the fields 
    this.fields = [
      {
        //When you use this only you create a hidden field 
        key: 'id' //binds to property name of the model 
      },
      {
        key: 'firstName',
        type: 'input', //specifies its an input control there are various other control types....
        templateOptions: { //object that specifies the type of the data used 
          type: 'text',//here we use text but you could use number etc.... 
          label: 'First Name', //the labedl on top of the field 
          required: true, //required validator ... there's min max , minlenght, maxlength , pattern etc....
        }
      },
      {
        key: 'age',
        type: 'input',
        templateOptions: {
          type: 'number',
          label: 'Age',
          min: 18,
          max: 60,
          required: true
        },
        validation: {//validation is optional however you can specify (for each validator in templateOptions the following messages )
          messages: {
            required: `field is required`,
            //for more fancy logic you can utilise the error object and  the field itself 
            min: (error, field: FormlyFieldConfig) => `${error.min} is the minimum and you inserted ${field.formControl.value}`,
            max: (err) => `${err.max} is the maximum and you inserted ${err.actual}`
          }
        }
      },
      {
        key: 'email',
        type: 'input',
        templateOptions: {
          type: 'email',
          label: 'email',
          required: true,
          //some pattern matching :) 
          pattern: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
        },
        validation:{
          messages:{
            pattern: (err,field)=> `${err.actualValue} is not a valid email address!`
            //NOTE if you want to create a global set of validators in your solution you can declare the following in the FormlyModule in AppModule as  folloes:
            // validators:[
            //  {name: 'name of validator',
            //  validation: expression or validatorFunction
            //  }
            //], 
            //validationMessages: [
            // { name:'name of property', message: 'messsage or functionname'},
            // { name:'name of property', message: 'messsage or functionname'}
            //]
        }
      }
      },
      {
        key: 'countryAutocomplete',
        type: 'autocomplete',
        templateOptions: {
          required: true,
          label: 'Country Autocomplete',
          placeholder: 'please start typing....',
          displayLabel: (v) => (v) ? v.label : v,
          filter: (term) => {
            return  typeof(term)==="string" ? of(this.nations.filter(n => n.label.toLowerCase().indexOf(term.toLowerCase())===0))  : of([term]);
          }
       },
      },
      {
        key: 'nationId',
        type: 'select',
        templateOptions: {
          label: 'Nation',
          options: this.ds.getNations(),
        },
        hooks: {
          //these can be done per control level and there are various hooks (similar to angular....)
          onInit: (field: FormlyFieldConfig) => {
            field.templateOptions.label = "Changed via OnInit!"
            // you can access form and formcontrol and model ... and you can then utilise reactive forms behaviour 
          }
        }
      },
      {
        key: 'cityId',
        type: 'select',
        templateOptions: {
          label: 'Cities',
          options: [],
        },
        expressionProperties: { //evaluated at runtime 
          'templateOptions.disabled': (model) => !model.nationId, //callback form 
          'model.cityId': '!model.nationId ? null : model.cityId' //strong form 
        },
        hideExpression: (model) => !model.nationId, // can be done in string or callback form 
        hooks: { //evalutated during lifecycle hooks 
          onInit: (field: FormlyFieldConfig) => {
            field.templateOptions.options = field.form.get('nationId').valueChanges.pipe(
              startWith(this.model.nationId),
              switchMap(id => this.ds.getCities(id)));
          }
        }
      }
    ];
  }

  //remember to initialise any services and formgroups 
  constructor(private ds: DataService) {
     ds.getNations().subscribe(n => this.nations = n);
     this.init();
  }

  //prints the model that is submitted...... 
  onSubmit({ valid, value }): void {
    if (valid) { //if form submission had no errors ....
      console.table(value); //....log the output ... 
    }
  }
}


