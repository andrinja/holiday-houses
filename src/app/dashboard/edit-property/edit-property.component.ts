import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Property } from 'src/app/shared/property.model';
import { NgRedux } from '@angular-redux/store';
import { AppState } from '../store/store';
import { map } from 'rxjs/operators';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { select } from '@ngrx/store';
import { PropertyActions } from '../store/properties.actions';


@Component({
  selector: 'app-edit-property',
  templateUrl: './edit-property.component.html',
  styleUrls: ['./edit-property.component.scss']
})
export class EditPropertyComponent implements OnInit {
  property: object;
  // editPropertyForm: FormGroup;
  locations = ['Denmark', 'Sweden', 'Norway'];

  constructor( private route: ActivatedRoute,
               private store: NgRedux<AppState>,
               private propertyActions: PropertyActions) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.store.select('properties').subscribe( state => {
      
    });
  }

}
