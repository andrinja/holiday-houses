import { Component, OnInit, OnDestroy } from '@angular/core';
import { Property } from '../../shared/property.model';
import { DataStorageService } from 'src/app/services/data-storage.service';
import { NgRedux } from '@angular-redux/store';
import { AppState } from '../store/store';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.scss']
})
export class PropertyListComponent implements OnInit, OnDestroy {
  properties: Property[];
  isLoading: boolean;
  subscription: Subscription;

  constructor(private data: DataStorageService,
              private ngRedux: NgRedux<AppState>) { }

  ngOnInit() {
    this.subscription = this.ngRedux.select(state => state.properties).subscribe(response => {
      this.properties = response.properties;
      this.isLoading = response.isLoading;
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}



