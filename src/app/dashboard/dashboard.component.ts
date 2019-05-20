import { Component, OnInit } from '@angular/core';
import { PropertyActions } from './store/properties.actions';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  
})
export class DashboardComponent implements OnInit {

  constructor(private propertyActions: PropertyActions) { }

  ngOnInit() {

    this.propertyActions.getProperties();
  }


}
