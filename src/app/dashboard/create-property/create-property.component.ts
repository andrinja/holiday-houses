import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Routes } from '@angular/router';
import { PropertyActions } from '../store/properties.actions';
import { PropertyService } from 'src/app/services/property.service';
import { Property } from 'src/app/shared/property.model';
import { NgRedux } from '@angular-redux/store';
import { AppState } from '../store/store';

@Component({
  selector: 'app-create-property',
  templateUrl: './create-property.component.html',
  styleUrls: ['./create-property.component.scss']
})
export class CreatePropertyComponent implements OnInit {
  locations = ['Denmark', 'Sweden', 'Norway'];
  propertyForm: FormGroup;

  constructor( private PropertyActions: PropertyActions 
               ) { }

  ngOnInit() {
      this.propertyForm = new FormGroup({
        'name': new FormControl(null, Validators.required),
        'description': new FormControl(null, Validators.required),
        'address': new FormControl(null, Validators.required),
        'location': new FormControl('Denmark', Validators.required)
      })
  }

  onSubmit() {
    let property = this.propertyForm.value as Property;
    this.PropertyActions.createNewProperty(property);
    
  }

}
