import { Component, OnInit } from '@angular/core';
import { PropertyActions } from './store/properties.actions';
import { User } from 'firebase';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  
})

export class DashboardComponent implements OnInit {
  user: string;

  constructor(private propertyActions: PropertyActions,
              private auth: AuthService) { }

  ngOnInit() {
    this.user = this.auth.getUser().displayName;
    this.propertyActions.getProperties();
  }


}
